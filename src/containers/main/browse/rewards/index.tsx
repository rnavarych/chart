import React, { useState } from 'react';
import { View, ScrollView, ImageSourcePropType, FlatList } from 'react-native';

import Text from '../../../../components/text';
import Tip from '../../../../components/tip';
import Separator from '../../../../components/separator';
import BadgeWithCounter from '../../../../components/badgeWithCounter';

import { formatNumberToIntWithCommas as formatToIntWithCommas } from '../../../../utils/string';
import images from '../../../../configs/images';

import styles from './styles';

class RewardBadgeData {
  name: string;
  level: number;
  icon: ImageSourcePropType;

  constructor(name: string, level: number, icon: ImageSourcePropType) {
    this.name = name;
    this.level = level;
    this.icon = icon;
  }
}

interface Props {
  navigation: any;
}

const fakeRewardsData: RewardBadgeData[] = [
  new RewardBadgeData('Tech', 1, images.badgeBanana),
  new RewardBadgeData('Food', 2, images.badgeBanana),
  new RewardBadgeData('Health', 3, images.badgeBanana),
  new RewardBadgeData('Movement', 4, images.badgeBanana),
  new RewardBadgeData('Exercise', 5, images.badgeBanana),
  new RewardBadgeData('Goals', 6, images.badgeBanana),
  new RewardBadgeData('Education', 7, images.badgeBanana),
];

function RewardsScreen(props: Props) {
  const { navigation } = props;
  const [totalPoints, setTotalPoints] = useState<number>(1657);
  const [weekPoints, setWeekPoints] = useState<number>(123);
  const [weekGoal, setWeekGoal] = useState<number>(250);

  return (
    <ScrollView contenContainerStyle={styles.container}>
      <Tip text="Stay in school, kids! Also, don't forget to update your weight regularly." />
      <View style={styles.statsContainer}>
        <Text style={styles.label}>
          Current total points: {formatToIntWithCommas(totalPoints)}
        </Text>
        <Separator />
        <Text style={styles.label}>
          Week Point Progress: {formatToIntWithCommas(weekPoints)} /{' '}
          {formatToIntWithCommas(weekGoal)}
        </Text>
        <Separator />
        <Text style={styles.label}>Badges</Text>
        <View style={styles.badgesList}>
          {fakeRewardsData.map((value, index) => {
            return (
              <BadgeWithCounter
                image={value.icon}
                label={value.name}
                counter={value.level}
                containerStyle={styles.badge}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

export default RewardsScreen;
