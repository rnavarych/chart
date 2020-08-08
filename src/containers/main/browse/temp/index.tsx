import React, { useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';

import moment from 'moment';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import { useShallowSelector } from '../../../../hooks';

import { DateUtils, EntryUtils } from '../../../../utils';
import {
  GET_ENTRIES_BY_TYPES,
  MARK_AS_SEEN,
  DELETE_METRIC,
} from '../../../../requests/deviceQL';
import styles from './styles';
import { TimeSection } from '../../../../interfaces/entities';

interface Props {
  navigation: any;
}

const compareServerMetricTime = (a, b) =>
  DateUtils.compareTime(a.start_time, b.start_time, 'DD:MM:YY HH:mm:ss');

export const filterPressureAndSteps = (i) =>
  i.type !== 'systolic' && i.type !== 'diastolic' && i.type !== 'steps';
const filterAnyButWeight = (i) => i.type === 'body_weight';
const filterPressure = (i) => i.type !== 'systolic' && i.type !== 'diastolic';
const filterAnyButPressure = (i) => i.type === 'systolic' || i.type === 'diastolic';
const noFilters = () => true;
const filterAnyButSteps = (i) => i.type === 'steps';
const filterTypes = (i) =>
  i.type === 'measurement' || i.type === 'nutrition' || i.type === 'workout';

const extractData = (rawData: any[]) => {
  return rawData?.event_types[0].categories
    .reduce((acc, val) => acc.concat(val.sources), [])
    .reduce((acc, val) => acc.concat(val.metrics), []);
};

export const processAndFilterData = (data: any, filter: any) => {
  if (!data) return [];
  return data
    .filter(filterTypes)
    .reduce((acc, val) => acc.concat(extractData(val)), [])
    .filter(filter);
};

function TempScreen(props: Props) {
  const { userId } = useShallowSelector(({ auth: { userId } }) => ({
    userId,
  }));

  const now = moment();
  const start_date = now.startOf('day').toISOString(true);
  const end_date = now.endOf('day').toISOString(true);

  useEffect(() => {
    getEntriesByTypes({
      variables: {
        user_id: userId,
        types: [
          'body_weight',
          'systolic',
          'diastolic',
          'steps',
          'blood_glucose',
          'carbohydrate',
          'medication',
        ],
        start_date,
        end_date,
      },
    });
  }, []);

  const [markAsSeenRequest] = useMutation(MARK_AS_SEEN);
  const [hideMetricsRequest] = useMutation(DELETE_METRIC);
  const [getEntriesByTypes, { data: entries, loading }] = useLazyQuery(
    GET_ENTRIES_BY_TYPES,
    {
      fetchPolicy: 'no-cache',
    },
  );

  let data;

  console.log('RAW: ', entries);
  let other = entries
    ? processAndFilterData(entries.results.metrics, filterPressureAndSteps)
    : [];
  let pressure = entries
    ? processAndFilterData(entries.results.metrics, filterAnyButPressure)
    : [];

  let processedSteps = [];
  let steps = entries
    ? processAndFilterData(entries.results.metrics, filterAnyButSteps)
    : [];
  steps = steps.map((i) => ({
    ...i,
    timeSection: DateUtils.detectTimeSection(i.start_time),
  }));
  const mornSteps = steps
    .filter((i) => i.timeSection === TimeSection.MORNING)
    .reduce((acc, val) => (acc += val.value), 0);
  const afterSteps = steps
    .filter((i) => i.timeSection === TimeSection.AFTERNOON)
    .reduce((acc, val) => (acc += val.value), 0);
  const eveSteps = steps
    .filter((i) => i.timeSection === TimeSection.EVENING)
    .reduce((acc, val) => (acc += val.value), 0);
  console.log('STEPS: ', mornSteps, afterSteps, eveSteps);
  // TEMP LOGIC
  if (mornSteps >= 5000)
    processedSteps.push({
      value: 'Active',
      timeSection: TimeSection.MORNING,
      type: 'activity',
      seen_at: null,
      start_time: '04:00',
      origin: 'unknown',
    });

  const upper = pressure
    .filter((i) => i.type === 'systolic')
    .sort(compareServerMetricTime);
  const lower = pressure
    .filter((i) => i.type === 'diastolic')
    .sort(compareServerMetricTime);
  pressure = upper.map((item, i) => ({
    ...item,
    id: [item.id, lower[i].id],
    value: `${item.value}/${lower[i].value}`,
    seen_at: item.seen_at && lower[i].seen_at ? item.seen_at : null,
    type: 'blood_pressure',
  }));
  data = [...other, ...pressure, ...processedSteps].sort(compareServerMetricTime);
  console.log('RESULT: ', data);

  const renderButton = (item, color, onPressRequest, title) => {
    return (
      <TouchableOpacity
        onPress={() =>
          onPressRequest({
            variables: {
              user_id: userId,
              metric_ids: Array.isArray(item.id)
                ? item.id.map((i) => parseInt(i))
                : [parseInt(item.id)],
            },
          }).then(() =>
            getEntriesByTypes({
              variables: {
                user_id: userId,
                types: [
                  'body_weight',
                  'systolic',
                  'diastolic',
                  'steps',
                  'blood_glucose',
                  'carbohydrate',
                ],
                start_date,
                end_date,
              },
            }),
          )
        }
        style={{
          backgroundColor: color,
          borderRadius: 5,
          width: 100,
          padding: 5,
          margin: 5,
        }}>
        <Text style={{ flex: 1, textAlign: 'center', color: 'white' }}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          hideMetricsRequest({
            variables: {
              user_id: userId,
              metric_ids: data
                .map((item) => {
                  if (Array.isArray(item.id)) {
                    [item.id.map((id) => parseInt(id))];
                  }
                  return parseInt(item.id);
                })
                .reduce((acc, val) => acc.concat(val), []),
            },
          }).then(() =>
            getEntriesByTypes({
              variables: {
                user_id: userId,
                types: [
                  'body_weight',
                  'systolic',
                  'diastolic',
                  'steps',
                  'blood_glucose',
                  'carbohydrate',
                ],
                start_date,
                end_date,
              },
            }),
          );
        }}
        style={{ backgroundColor: 'pink', padding: 5, borderRadius: 5, margin: 5 }}>
        <Text>DELETE ALL FOR TODAY</Text>
      </TouchableOpacity>
      <FlatList
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
        ListEmptyComponent={<Text style={{ padding: 10 }}>No data for today</Text>}
        renderItem={({ item }) => (
          <View
            style={{
              margin: 10,
              justifyContent: 'center',
              backgroundColor: 'pink',
              borderRadius: 10,
              padding: 10,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1.5, margin: 5 }}>
                <Text>
                  {`${item.value} (${item.unit}) | ${DateUtils.format(
                    item.end_time,
                    'hh:mm A',
                  )}`}
                </Text>
                <Text>{`type: ${item.type}`}</Text>
                <Text>{`seen: ${!!item.seen_at}`}</Text>
                <Text>{`origin: ${item.origin}`}</Text>
                <View
                  style={{
                    width: 50,
                    height: 20,
                    marginTop: 5,
                    backgroundColor: EntryUtils.determineColorAndMessage(
                      item.unit === 'boolean'
                        ? item.value === null
                          ? false
                          : true
                        : String(item.value),
                      item.type,
                    ).color,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 5,
                  borderRadius: 5,
                  backgroundColor: 'white',
                }}>
                <Text>{`notes: ${
                  item.user_notes ? item.user_notes[0].value : '--'
                }`}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              {renderButton(item, 'green', markAsSeenRequest, 'MAKE SEEN')}
              {renderButton(item, 'red', hideMetricsRequest, 'DELETE')}
            </View>
          </View>
        )}
        {...{ data }}
      />
    </View>
  );
}

export default TempScreen;
