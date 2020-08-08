import { EntryColor } from './entities';

export interface CreateEntryProps {
  color: EntryColor;
  message: string;
  creationTime: string;
  icon: string; // TODO: type?
  note: string;
  value: string | string[];
  unit: string;
}
