import { VideoInfo } from './video';

// TODO: placeholder classes for testing. Replace with actual data classes later
export class Exercise {
  id: string;
  name: string;
  video: VideoInfo;
  description: string;
  duration: number;

  constructor(
    id: string,
    name: string,
    description: string,
    duration: number,
    video: VideoInfo,
  ) {
    this.id = id;
    this.name = name;
    this.video = video;
    this.description = description;
    this.duration = duration;
  }
}

export class ExerciseCategory {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
