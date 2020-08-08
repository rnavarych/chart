import React, { useState, useMemo } from 'react';
import { View, Alert } from 'react-native';
import { useShallowSelector } from '../../../hooks';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useMutation } from '@apollo/react-hooks';
import moment from 'moment-timezone';

import Button from '../../../components/buttons/buttonNeomorph';
import Input from '../../../components/inputNeomorph';
import Text from '../../../components/text';
import Tip from '../../../components/tip';
import DatePicker from '../../../components/pickers/datetimePicker';
import DropdownPicker from '../../../components/pickers/dropdownPicker';

import {
  weightValidation,
  zipcodeValidation,
  addressValidation,
  nameValidation,
  cityValidation,
} from '../../../utils/validation';

import * as routes from '../../../nav/routes';
import { log, DateUtils } from '../../../utils';
import {
  genderList,
  statesList,
  getElementByValue,
  DropdownItem,
} from '../../../constants/arrays';
import * as I18n from '../../../I18n';
import styles from './styles';
import * as constants from '../../../constants';

import { ProfileBody } from '../../../requests/profile';
import {
  convertDateToServerString,
  convertServerStringToDate,
} from '../../../utils/dates';
import { CREATE_PROFILE, UPDATE_PROFILE } from '../../../requests/profileQL';
import { PROVISION_USER } from '../../../requests/deviceQL';
import * as GQL_TYPES from '../../../interfaces/graphQL';

interface Route {
  params: {
    editMode: boolean;
    profile?: ProfileBody;
  };
}

interface Props {
  navigation: any; // TODO: add proper navigation type
  route: Route;
}

function ProfileScreen(props: Props) {
  const { userId } = useShallowSelector(({ auth: { userId } }) => ({
    userId,
  }));
  const { editMode = true, profile } = props.route.params;
  log.debug('Profile screen params:', props.route.params);

  // generated array of timezone values (in inches) for dropdown
  // previously was stored as a constant array when it was smaller
  const timezones = useMemo(
    () =>
      moment.tz.zonesForCountry('US').map((value) => {
        return { value: value, label: value };
      }),
    [],
  );

  // generated array of height values (in inches) for dropdown
  const heightList = useMemo(() => {
    const arr: Array<DropdownItem> = [];
    const minInches = 20;
    const maxInches = 110;
    for (let i = minInches; i <= maxInches; i++) {
      const inches = i % 12;
      const feet = (i - inches) / 12;
      arr.push({ label: `${feet}' ${inches}"`, value: i.toString() });
    }
    return arr;
  }, []);

  const { minDate, maxDate } = useMemo(() => {
    const maxDateOfBirth = new Date();
    maxDateOfBirth.setFullYear(maxDateOfBirth.getFullYear() - constants.minAgeOfUser);
    return {
      minDate: new Date(constants.minDateOfBirth),
      maxDate: maxDateOfBirth,
    };
  }, []);

  const initialTimezone = useMemo(() => {
    const tz = profile?.timezone
      ? { value: profile?.timezone, label: profile?.timezone }
      : timezones[0];
    return tz;
  }, [profile]);

  const { navigation } = props;
  const [fullName, setFullname] = useState(profile?.full_name ? profile.full_name : '');
  const [address1, setAddress1] = useState(profile?.address1 ? profile.address1 : '');
  const [address2, setAddress2] = useState(profile?.address2 ? profile.address2 : '');
  const [city, setCity] = useState(profile?.city ? profile.city : '');
  const [state, setState] = useState(
    profile?.state
      ? getElementByValue(statesList, profile.state) || statesList[0]
      : statesList[0],
  );
  const [zipCode, setZipCode] = useState(profile?.zip_code ? profile.zip_code : '');
  const [error, setError] = useState('');
  const [gender, setGender] = useState(genderList[0]);
  const [heightInches, setHeightInches] = useState(
    profile?.height
      ? getElementByValue(heightList, profile.height.toString()) || heightList[50]
      : heightList[50],
  );
  const [weight, setWeight] = useState(profile?.weight ? profile.weight.toString() : '');
  const [dateOfBirth, setDateOfBirth] = useState(
    profile?.dob
      ? convertServerStringToDate(profile.dob)
      : convertServerStringToDate(constants.defaultDateOfBirth),
  );
  const [timezone, setTimezone] = useState(initialTimezone);

  // VALIDATION
  const [firstValid, setFirstValid] = useState(true); // add firstname?
  const [lastValid, setLastValid] = useState(true); // add lastname?
  const [fullNameValid, setFullNameValid] = useState(true);
  const [zipValid, setZipValid] = useState(!!profile?.zip_code);
  const [cityValid, setCityValid] = useState(true);
  const [address1Valid, setAddress1Valid] = useState(!!profile?.address1);
  const [address2Valid, setAddress2Valid] = useState(true);
  const [weightValid, setWeightValid] = useState(!!profile?.weight);

  // request
  const [profileMutationQL, { loading }] = useMutation(
    editMode ? UPDATE_PROFILE : CREATE_PROFILE,
  );
  const [provisionUser, { loading: provisioningUser }] = useMutation<
    GQL_TYPES.ProvisionUserParams
  >(PROVISION_USER, {
    variables: {
      user_id: userId,
    },
  });

  const onCreateProfileSuccess = () => {
    provisionUser()
      .then(() => navigation.replace(routes.REWARDS_INTRO))
      .catch((error) => log.debug(`Error provisioning user: ${error}`));
  };

  const onUpdateProfileSuccess = () => {
    Alert.alert(I18n.strings('screens.profile.successfullyUpdated'), undefined, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  const getNewProfileValues = (): ProfileBody => {
    const profileValue = {
      // ADD date of birth
      // what about gender? (graphQL is not allowing it to be in the body)
      //gender: gender.value,
      full_name: `${fullName}`,
      address1,
      address2,
      city,
      state: state?.value || '',
      dob: convertDateToServerString(dateOfBirth),
      zip_code: zipCode,
      height: Number(heightInches.value),
      weight: weight ? Number(weight) : 0,
      locale: constants.defaultLocale,
      country: constants.defaultCountryCode,
      // TODO: replace hardcoded timezone with selection
      timezone: timezone.value,
    };
    log.debug('Profile update value', profileValue);
    return profileValue;
  };

  const updateUserProfile = () => {
    setError('');
    profileMutationQL({
      variables: { user_id: userId, profile: getNewProfileValues() },
    })
      .then(editMode ? onUpdateProfileSuccess : onCreateProfileSuccess)
      .catch((error) => setError(`${error.message}`));
  };

  const onSubmitPressed = () => {
    updateUserProfile();
  };

  const checkValidData = (): boolean => {
    return zipValid && cityValid && address1Valid && address2Valid && weightValid;
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.screen}
      style={styles.scrollView}>
      {editMode === false && (
        <Tip text={I18n.strings('screens.createProfile.tipText')} charPosition="right" />
      )}
      <View style={styles.content}>
        {/* Name block */}
        <Input
          containerStyle={styles.firstElement}
          required={true} // maybe export to valid rules
          label={I18n.strings('labels.fullName')}
          placeholder={I18n.strings('labels.fullName')}
          text={fullName}
          onChange={(input, isValid) => {
            setFullNameValid(isValid);
            setFullname(input);
          }}
          validationRule={nameValidation}
        />
        <DatePicker
          date={dateOfBirth}
          onDateChange={setDateOfBirth}
          label={I18n.strings('labels.dateOfBirth')}
          modalTitle={I18n.strings('labels.dateOfBirth')}
          formatDate={DateUtils.formatDate}
          minDate={minDate}
          maxDate={maxDate}
        />
        {/* Height block */}
        <DropdownPicker
          value={gender}
          label={I18n.strings('labels.gender')}
          modalTitle={I18n.strings('labels.gender')}
          data={genderList}
          onValueChanged={(newValue) => setGender(newValue)}
        />
        <DropdownPicker
          value={heightInches}
          label={I18n.strings('labels.height')}
          modalTitle={I18n.strings('labels.height')}
          data={heightList}
          onValueChanged={(newValue) => setHeightInches(newValue)}
        />
        <Input
          isValid={weightValid}
          required={true}
          label={I18n.strings('labels.weight')}
          placeholder={I18n.strings('labels.weight')}
          text={weight}
          onChange={(input, isValid) => {
            setWeightValid(isValid);
            setWeight(input);
          }}
          containerStyle={styles.inputField}
          keyboardType={'numeric'}
          maxLength={3}
          validationRule={weightValidation}
        />
        {/* Address block */}
        <Input
          required={true} // maybe export to valid rules
          label={I18n.strings('labels.address1')}
          placeholder={I18n.strings('labels.address1')}
          text={address1}
          onChange={(input, isValid) => {
            setAddress1Valid(isValid);
            setAddress1(input);
          }}
          containerStyle={styles.inputFirstInBlock}
          isValid={address1Valid}
          validationRule={addressValidation}
        />
        <Input
          label={I18n.strings('labels.address2')}
          placeholder={I18n.strings('labels.address2')}
          text={address2}
          onChange={(input, isValid) => {
            setAddress2Valid(isValid);
            setAddress2(input);
          }}
          containerStyle={styles.inputField}
          isValid={address2Valid}
          validationRule={addressValidation}
        />
        <Input
          label={I18n.strings('labels.city')}
          placeholder={I18n.strings('labels.city')}
          text={city}
          onChange={(input, isValid) => {
            setCityValid(isValid);
            setCity(input);
          }}
          containerStyle={styles.inputField}
          isValid={cityValid}
          validationRule={cityValidation}
        />
        <DropdownPicker
          value={state}
          label={I18n.strings('labels.state')}
          modalTitle={I18n.strings('labels.state')}
          data={statesList}
          onValueChanged={(newValue) => setState(newValue)}
        />
        <Input
          required={true} // maybe export to valid rules
          label={I18n.strings('labels.zipCode')}
          placeholder={I18n.strings('labels.zipCode')}
          text={zipCode}
          keyboardType={'numeric'}
          maxLength={10} // ADD to one place VALIDATION RULES
          onChange={(input, isValid) => {
            setZipValid(isValid);
            setZipCode(input);
          }}
          isValid={zipValid}
          containerStyle={styles.inputField}
          validationRule={zipcodeValidation}
        />
        <DropdownPicker
          value={timezone}
          label={I18n.strings('labels.timezone')}
          modalTitle={I18n.strings('labels.timezone')}
          data={timezones}
          onValueChanged={(newValue) => setTimezone(newValue)}
        />
        <Text style={styles.error}>{error}</Text>
        <View style={styles.buttonsContainer}>
          <Button
            fetching={loading || provisioningUser}
            disabled={!checkValidData()}
            text={I18n.strings('buttons.submit')}
            onPress={onSubmitPressed}
            buttonType={'full-line'}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default ProfileScreen;
