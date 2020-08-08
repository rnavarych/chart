export interface GetDeviceDTO {
  id: string;
  user_id: string;
  device_name: string;
  device_id: string;
  created: string;
}

export interface UpsertDeviceParams {
  user_id: string;
  device_name: string;
  device_id: string;
}

export interface DeleteDeviceParams {
  id: number;
  user_id: string;
}

export interface DeviceInfo {
  id: string;
  deviceName: string;
  deviceId: string;
  created: string;
}
