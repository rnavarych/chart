import moment from 'moment';

const realMockValues = '[{"id":"86337","seen_at":null,"value":123,"type":"blood_glucose","origin":"manual","start_time":"2020-07-23T06:55:18.463Z","end_time":"2020-07-23T06:55:18.463Z","unit":"mg/dL","user_notes":null,"__typename":"Metric"},{"id":"86338","seen_at":null,"value":100,"type":"blood_glucose","origin":"manual","start_time":"2020-07-23T06:55:32.213Z","end_time":"2020-07-23T06:55:32.213Z","unit":"mg/dL","user_notes":[{"value":"Hello there","__typename":"UserNote"}],"__typename":"Metric"},{"id":"86342","seen_at":null,"value":12,"type":"blood_glucose","origin":"manual","start_time":"2020-07-23T08:24:33.274Z","end_time":"2020-07-23T08:24:33.274Z","unit":"mg/dL","user_notes":null,"__typename":"Metric"},{"id":"86344","seen_at":null,"value":14,"type":"blood_glucose","origin":"manual","start_time":"2020-07-23T09:19:32.334Z","end_time":"2020-07-23T09:19:32.334Z","unit":"mg/dL","user_notes":null,"__typename":"Metric"},{"id":"86873","seen_at":"2020-07-24T10:09:24.619Z","value":56,"type":"blood_glucose","origin":"manual","start_time":"2020-07-24T05:40:08.414Z","end_time":"2020-07-24T05:40:08.414Z","unit":"mg/dL","user_notes":null,"__typename":"Metric"},{"id":"86874","seen_at":"2020-07-24T10:09:26.164Z","value":120,"type":"blood_glucose","origin":"manual","start_time":"2020-07-24T05:40:25.720Z","end_time":"2020-07-24T05:40:25.720Z","unit":"mg/dL","user_notes":null,"__typename":"Metric"},{"id":"86875","seen_at":"2020-07-24T10:09:27.840Z","value":298,"type":"blood_glucose","origin":"manual","start_time":"2020-07-24T06:58:36.430Z","end_time":"2020-07-24T06:58:36.430Z","unit":"mg/dL","user_notes":null,"__typename":"Metric"},{"id":"86876","seen_at":"2020-07-24T10:03:20.023Z","value":123,"type":"blood_glucose","origin":"manual","start_time":"2020-07-24T07:04:31.607Z","end_time":"2020-07-24T07:04:31.607Z","unit":"mg/dL","user_notes":null,"__typename":"Metric"},{"id":"86879","seen_at":"2020-07-24T13:58:50.913Z","value":22,"type":"blood_glucose","origin":"manual","start_time":"2020-07-24T09:05:47.800Z","end_time":"2020-07-24T09:05:47.800Z","unit":"mg/dL","user_notes":null,"__typename":"Metric"},{"id":"86882","seen_at":"2020-07-24T10:03:24.688Z","value":276,"type":"blood_glucose","origin":"manual","start_time":"2020-07-24T09:17:14.041Z","end_time":"2020-07-24T09:17:14.041Z","unit":"mg/dL","user_notes":[{"value":"Awqwewqeweq","__typename":"UserNote"}],"__typename":"Metric"},{"id":"86880","seen_at":"2020-07-24T10:09:31.117Z","value":555,"type":"blood_glucose","origin":"manual","start_time":"2020-07-24T09:18:15.000Z","end_time":"2020-07-24T09:18:15.000Z","unit":"mg/dL","user_notes":null,"__typename":"Metric"},{"id":"86903","seen_at":"2020-07-24T13:59:20.306Z","value":120,"type":"blood_glucose","origin":"manual","start_time":"2020-07-24T15:59:06.000Z","end_time":"2020-07-24T15:59:06.000Z","unit":"mg/dL","user_notes":null,"__typename":"Metric"},{"id":"134614","seen_at":"2020-07-28T12:30:37.947Z","value":11,"type":"blood_glucose","origin":"manual","start_time":"2020-07-28T12:29:03.246Z","end_time":"2020-07-28T12:29:03.246Z","unit":"mg/dL","user_notes":null,"__typename":"Metric"},{"id":"134710","seen_at":"2020-07-28T14:45:31.081Z","value":33,"type":"blood_glucose","origin":"manual","start_time":"2020-07-28T14:45:22.351Z","end_time":"2020-07-28T14:45:22.351Z","unit":"mg/dL","user_notes":null,"__typename":"Metric"},{"id":"186313","seen_at":"2020-07-31T08:47:22.505Z","value":32,"type":"blood_glucose","origin":"manual","start_time":"2020-07-31T08:47:03.599Z","end_time":"2020-07-31T08:47:03.599Z","unit":"mg/dL","user_notes":null,"__typename":"Metric"},{"id":"86328","seen_at":"2020-07-24T13:36:24.277Z","value":72,"type":"body_weight","origin":"manual","start_time":"2020-07-20T20:59:59.000Z","end_time":"2020-07-20T20:59:59.000Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86327","seen_at":"2020-07-24T13:36:22.387Z","value":70,"type":"body_weight","origin":"manual","start_time":"2020-07-20T20:59:59.000Z","end_time":"2020-07-20T20:59:59.000Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86326","seen_at":"2020-07-24T13:36:20.075Z","value":70,"type":"body_weight","origin":"manual","start_time":"2020-07-20T20:59:59.000Z","end_time":"2020-07-20T20:59:59.000Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86332","seen_at":"2020-07-24T13:36:41.141Z","value":86,"type":"body_weight","origin":"manual","start_time":"2020-07-21T20:59:59.000Z","end_time":"2020-07-21T20:59:59.000Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86330","seen_at":"2020-07-24T13:36:37.784Z","value":78,"type":"body_weight","origin":"manual","start_time":"2020-07-21T20:59:59.000Z","end_time":"2020-07-21T20:59:59.000Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86329","seen_at":"2020-07-24T13:36:36.242Z","value":72,"type":"body_weight","origin":"manual","start_time":"2020-07-21T20:59:59.000Z","end_time":"2020-07-21T20:59:59.000Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86331","seen_at":"2020-07-24T13:36:39.394Z","value":78,"type":"body_weight","origin":"manual","start_time":"2020-07-21T20:59:59.000Z","end_time":"2020-07-21T20:59:59.000Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86335","seen_at":"2020-07-24T13:36:42.774Z","value":65.9,"type":"body_weight","origin":"manual","start_time":"2020-07-23T04:44:36.000Z","end_time":"2020-07-23T04:44:36.000Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86333","seen_at":"2020-07-24T13:36:45.173Z","value":123,"type":"body_weight","origin":"manual","start_time":"2020-07-23T06:44:26.517Z","end_time":"2020-07-23T06:44:26.517Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86334","seen_at":"2020-07-24T13:36:46.969Z","value":98.87,"type":"body_weight","origin":"manual","start_time":"2020-07-23T06:46:40.448Z","end_time":"2020-07-23T06:46:40.448Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86347","seen_at":"2020-07-24T13:36:48.878Z","value":123,"type":"body_weight","origin":"manual","start_time":"2020-07-23T10:20:58.011Z","end_time":"2020-07-23T10:20:58.011Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86336","seen_at":"2020-07-24T13:36:50.625Z","value":34.55,"type":"body_weight","origin":"manual","start_time":"2020-07-23T18:47:49.000Z","end_time":"2020-07-23T18:47:49.000Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86894","seen_at":"2020-07-24T13:38:54.809Z","value":67,"type":"body_weight","origin":"manual","start_time":"2020-07-24T00:38:41.000Z","end_time":"2020-07-24T00:38:41.000Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86897","seen_at":"2020-07-24T13:40:24.606Z","value":44,"type":"body_weight","origin":"manual","start_time":"2020-07-24T01:40:09.000Z","end_time":"2020-07-24T01:40:09.000Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86899","seen_at":"2020-07-24T13:45:18.071Z","value":50,"type":"body_weight","origin":"manual","start_time":"2020-07-24T01:45:07.000Z","end_time":"2020-07-24T01:45:07.000Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86883","seen_at":"2020-07-24T10:09:12.876Z","value":78,"type":"body_weight","origin":"manual","start_time":"2020-07-24T09:46:17.395Z","end_time":"2020-07-24T09:46:17.395Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86887","seen_at":"2020-07-24T10:30:11.532Z","value":123,"type":"body_weight","origin":"manual","start_time":"2020-07-24T10:28:30.977Z","end_time":"2020-07-24T10:28:30.977Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86898","seen_at":"2020-07-24T13:45:01.729Z","value":12,"type":"body_weight","origin":"manual","start_time":"2020-07-24T12:44:51.000Z","end_time":"2020-07-24T12:44:51.000Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86893","seen_at":"2020-07-24T13:38:28.455Z","value":123,"type":"body_weight","origin":"manual","start_time":"2020-07-24T13:37:34.116Z","end_time":"2020-07-24T13:37:34.116Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86895","seen_at":"2020-07-24T13:39:38.072Z","value":53,"type":"body_weight","origin":"manual","start_time":"2020-07-24T13:39:26.200Z","end_time":"2020-07-24T13:39:26.200Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86900","seen_at":"2020-07-24T13:57:29.898Z","value":123,"type":"body_weight","origin":"manual","start_time":"2020-07-24T13:56:52.321Z","end_time":"2020-07-24T13:56:52.321Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86901","seen_at":"2020-07-24T13:57:41.489Z","value":23,"type":"body_weight","origin":"manual","start_time":"2020-07-24T13:57:34.590Z","end_time":"2020-07-24T13:57:34.590Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86902","seen_at":"2020-07-24T13:58:11.531Z","value":345,"type":"body_weight","origin":"manual","start_time":"2020-07-24T13:58:03.583Z","end_time":"2020-07-24T13:58:03.583Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86896","seen_at":"2020-07-24T13:40:05.383Z","value":34,"type":"body_weight","origin":"manual","start_time":"2020-07-24T15:39:54.000Z","end_time":"2020-07-24T15:39:54.000Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"86907","seen_at":null,"value":123,"type":"body_weight","origin":"manual","start_time":"2020-07-24T16:18:09.217Z","end_time":"2020-07-24T16:18:09.217Z","unit":"lbs","user_notes":[{"value":"Qwe ","__typename":"UserNote"}],"__typename":"Metric"},{"id":"133651","seen_at":"2020-07-27T20:02:18.095Z","value":55,"type":"body_weight","origin":"manual","start_time":"2020-07-27T19:36:59.764Z","end_time":"2020-07-27T19:36:59.764Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"133705","seen_at":null,"value":555,"type":"body_weight","origin":"manual","start_time":"2020-07-27T20:07:29.342Z","end_time":"2020-07-27T20:07:29.342Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"134613","seen_at":"2020-07-28T12:30:40.343Z","value":45,"type":"body_weight","origin":"manual","start_time":"2020-07-28T12:28:58.649Z","end_time":"2020-07-28T12:28:58.649Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"134709","seen_at":"2020-07-28T14:45:19.504Z","value":80,"type":"body_weight","origin":"manual","start_time":"2020-07-28T14:45:10.912Z","end_time":"2020-07-28T14:45:10.912Z","unit":"lbs","user_notes":null,"__typename":"Metric"},{"id":"146193","seen_at":null,"value":68.9,"type":"body_weight","origin":"unknown","start_time":"2020-07-13T20:59:59.000Z","end_time":"2020-07-13T20:59:59.000Z","unit":"kg","user_notes":null,"__typename":"Metric"},{"id":"86905","seen_at":"2020-07-24T14:32:49.828Z","value":null,"type":"medication","origin":"manual","start_time":"2020-07-24T02:24:37.000Z","end_time":"2020-07-24T02:24:37.000Z","unit":"boolean","user_notes":null,"__typename":"Metric"},{"id":"86904","seen_at":"2020-07-24T14:30:07.869Z","value":1,"type":"medication","origin":"manual","start_time":"2020-07-24T14:23:29.195Z","end_time":"2020-07-24T14:23:29.195Z","unit":"boolean","user_notes":null,"__typename":"Metric"},{"id":"86906","seen_at":null,"value":2,"type":"medication","origin":"manual","start_time":"2020-07-24T14:33:49.059Z","end_time":"2020-07-24T14:33:49.059Z","unit":"boolean","user_notes":null,"__typename":"Metric"},{"id":"86343","seen_at":null,"value":25,"type":"carbohydrate","origin":"manual","start_time":"2020-07-23T01:28:23.882Z","end_time":"2020-07-23T01:28:23.882Z","unit":"g","user_notes":null,"__typename":"Metric"},{"id":"86341","seen_at":null,"value":123,"type":"carbohydrate","origin":"manual","start_time":"2020-07-23T07:14:30.652Z","end_time":"2020-07-23T07:14:30.652Z","unit":"g","user_notes":null,"__typename":"Metric"},{"id":"86881","seen_at":"2020-07-24T10:09:20.195Z","value":58,"type":"carbohydrate","origin":"manual","start_time":"2020-07-23T22:06:39.000Z","end_time":"2020-07-23T22:06:39.000Z","unit":"g","user_notes":null,"__typename":"Metric"},{"id":"86878","seen_at":"2020-07-24T10:09:21.723Z","value":123,"type":"carbohydrate","origin":"manual","start_time":"2020-07-24T08:30:19.280Z","end_time":"2020-07-24T08:30:19.280Z","unit":"g","user_notes":null,"__typename":"Metric"},{"id":"134708","seen_at":"2020-07-28T14:45:05.523Z","value":22,"type":"carbohydrate","origin":"manual","start_time":"2020-07-28T14:44:53.066Z","end_time":"2020-07-28T14:44:53.066Z","unit":"g","user_notes":null,"__typename":"Metric"},{"id":"186309","seen_at":"2020-07-31T06:54:37.110Z","value":123,"type":"carbohydrate","origin":"manual","start_time":"2020-07-31T06:49:51.559Z","end_time":"2020-07-31T06:49:51.559Z","unit":"g","user_notes":null,"__typename":"Metric"},{"id":["86340","86339"],"seen_at":null,"value":"120/80","type":"blood_pressure","origin":"manual","start_time":"2020-07-23T07:04:55.583Z","end_time":"2020-07-23T07:04:55.583Z","unit":"mmHg","user_notes":null,"__typename":"Metric"},{"id":["86886","86885"],"seen_at":null,"value":"124/68","type":"blood_pressure","origin":"manual","start_time":"2020-07-24T09:55:34.151Z","end_time":"2020-07-24T09:55:34.151Z","unit":"mmHg","user_notes":null,"__typename":"Metric"},{"id":["86889","86888"],"seen_at":null,"value":"999/88","type":"blood_pressure","origin":"manual","start_time":"2020-07-24T10:29:41.176Z","end_time":"2020-07-24T10:29:41.176Z","unit":"mmHg","user_notes":null,"__typename":"Metric"},{"id":["86891","86890"],"seen_at":null,"value":"12/12","type":"blood_pressure","origin":"manual","start_time":"2020-07-24T12:50:18.363Z","end_time":"2020-07-24T12:50:18.363Z","unit":"mmHg","user_notes":null,"__typename":"Metric"},{"id":["133704","133703"],"seen_at":"2020-07-27T20:02:16.174Z","value":"120/78","type":"blood_pressure","origin":"manual","start_time":"2020-07-27T20:00:29.421Z","end_time":"2020-07-27T20:00:29.421Z","unit":"mmHg","user_notes":null,"__typename":"Metric"},{"id":"88382","seen_at":null,"value":6691,"type":"steps","origin":"device","start_time":"2020-06-21T10:29:07.000Z","end_time":"2020-06-21T12:01:16.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"88441","seen_at":null,"value":1299,"type":"steps","origin":"device","start_time":"2020-06-21T12:51:38.000Z","end_time":"2020-06-21T13:10:25.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"134889","seen_at":null,"value":1213,"type":"steps","origin":"device","start_time":"2020-06-28T17:05:25.000Z","end_time":"2020-06-28T17:24:12.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"135110","seen_at":null,"value":1382,"type":"steps","origin":"device","start_time":"2020-06-28T20:40:16.000Z","end_time":"2020-06-28T21:05:52.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"140594","seen_at":null,"value":1154,"type":"steps","origin":"device","start_time":"2020-07-01T20:39:56.000Z","end_time":"2020-07-01T20:59:33.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"148509","seen_at":null,"value":2237,"type":"steps","origin":"device","start_time":"2020-07-14T13:22:37.000Z","end_time":"2020-07-14T13:51:38.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"148520","seen_at":null,"value":1343,"type":"steps","origin":"device","start_time":"2020-07-14T14:17:14.000Z","end_time":"2020-07-14T14:36:51.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"148557","seen_at":null,"value":8356,"type":"steps","origin":"device","start_time":"2020-07-14T18:21:17.000Z","end_time":"2020-07-14T19:44:56.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"149843","seen_at":null,"value":6830,"type":"steps","origin":"device","start_time":"2020-07-15T17:11:00.000Z","end_time":"2020-07-15T18:34:39.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"151382","seen_at":null,"value":4039,"type":"steps","origin":"device","start_time":"2020-07-16T19:23:21.000Z","end_time":"2020-07-16T20:31:04.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"151861","seen_at":null,"value":7865,"type":"steps","origin":"device","start_time":"2020-07-17T16:53:56.000Z","end_time":"2020-07-17T18:12:26.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"155318","seen_at":null,"value":934,"type":"steps","origin":"device","start_time":"2020-07-21T20:07:42.000Z","end_time":"2020-07-21T20:23:54.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"156641","seen_at":null,"value":1531,"type":"steps","origin":"device","start_time":"2020-07-22T15:00:56.000Z","end_time":"2020-07-22T15:22:16.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"159108","seen_at":null,"value":3026,"type":"steps","origin":"device","start_time":"2020-07-28T13:00:14.000Z","end_time":"2020-07-28T13:50:35.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"159119","seen_at":null,"value":1440,"type":"steps","origin":"device","start_time":"2020-07-28T14:03:23.000Z","end_time":"2020-07-28T14:18:45.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"86346","seen_at":null,"value":45,"type":"steps","origin":"manual","start_time":"2020-07-23T10:16:08.318Z","end_time":"2020-07-23T10:16:08.318Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"86348","seen_at":null,"value":233,"type":"steps","origin":"manual","start_time":"2020-07-23T10:23:50.484Z","end_time":"2020-07-23T10:23:50.484Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"86877","seen_at":"2020-07-24T10:09:15.685Z","value":123,"type":"steps","origin":"manual","start_time":"2020-07-24T08:29:39.120Z","end_time":"2020-07-24T08:29:39.120Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"86884","seen_at":"2020-07-24T10:09:17.240Z","value":32762764,"type":"steps","origin":"manual","start_time":"2020-07-24T09:47:24.208Z","end_time":"2020-07-24T09:47:24.208Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"133678","seen_at":null,"value":4000,"type":"steps","origin":"manual","start_time":"2020-07-27T03:49:45.000Z","end_time":"2020-07-27T03:49:45.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"133675","seen_at":null,"value":566,"type":"steps","origin":"manual","start_time":"2020-07-27T04:46:00.000Z","end_time":"2020-07-27T04:46:00.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"133686","seen_at":null,"value":600,"type":"steps","origin":"manual","start_time":"2020-07-27T04:50:22.000Z","end_time":"2020-07-27T04:50:22.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"133677","seen_at":null,"value":677,"type":"steps","origin":"manual","start_time":"2020-07-27T07:49:35.000Z","end_time":"2020-07-27T07:49:35.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"133674","seen_at":null,"value":45,"type":"steps","origin":"manual","start_time":"2020-07-27T19:45:23.060Z","end_time":"2020-07-27T19:45:23.060Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"133679","seen_at":null,"value":5000,"type":"steps","origin":"manual","start_time":"2020-07-27T19:50:41.524Z","end_time":"2020-07-27T19:50:41.524Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"133676","seen_at":null,"value":123,"type":"steps","origin":"manual","start_time":"2020-07-27T19:51:27.000Z","end_time":"2020-07-27T19:51:27.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"184781","seen_at":null,"value":200,"type":"steps","origin":"manual","start_time":"2020-07-30T16:07:34.132Z","end_time":"2020-07-30T16:07:34.132Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"184782","seen_at":null,"value":200,"type":"steps","origin":"manual","start_time":"2020-07-30T16:07:45.541Z","end_time":"2020-07-30T16:07:45.541Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"147159","seen_at":null,"value":544,"type":"steps","origin":"device","start_time":"2020-07-13T18:04:18.000Z","end_time":"2020-07-13T18:27:42.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"147339","seen_at":null,"value":852,"type":"steps","origin":"device","start_time":"2020-07-13T18:36:16.000Z","end_time":"2020-07-13T19:06:36.000Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"86345","seen_at":null,"value":456,"type":"steps","origin":"manual","start_time":"2020-07-23T09:49:51.874Z","end_time":"2020-07-23T09:49:51.874Z","unit":"count","user_notes":null,"__typename":"Metric"},{"id":"88251","seen_at":null,"value":2083,"type":"steps","origin":"device","start_time":"2020-06-19T16:37:58.000Z","end_time":"2020-06-19T18:04:08.000Z","unit":"count","user_notes":null,"__typename":"Metric"}]';

export const bloodGlucose = JSON.parse(realMockValues).filter(item => item.type === 'blood_glucose');

export const mockBloodGlucose = [
  {
    end_time: "2020-07-22T06:55:18.463Z",
    unit: "mg/dL",
    value: 123,
  }, {
    end_time: "2020-07-22T06:55:32.213Z",
    unit: "mg/dL",
    value: 100,
  }, {
    end_time: "2020-07-22T08:24:33.274Z",
    unit: "mg/dL",
    value: 12,
  },{
    end_time: "2020-07-22T09:19:32.334Z",
    unit: "mg/dL",
    value: 14,
  },{
    end_time: "2020-07-22T06:58:36.430Z",
    unit: "mg/dL",
    value: 298,
  }, {
    end_time: "2020-07-22T09:17:14.041Z",
    unit: "mg/dL",
    value: 276,
  },
  {
    end_time: "2020-07-21T06:55:18.463Z",
    unit: "mg/dL",
    value: 123,
  }, {
    end_time: "2020-07-21T06:55:32.213Z",
    unit: "mg/dL",
    value: 100,
  }, {
    end_time: "2020-07-21T08:24:33.274Z",
    unit: "mg/dL",
    value: 12,
  },{
    end_time: "2020-07-21T09:19:32.334Z",
    unit: "mg/dL",
    value: 14,
  },{
    end_time: "2020-07-21T06:58:36.430Z",
    unit: "mg/dL",
    value: 298,
  }, {
    end_time: "2020-07-21T09:17:14.041Z",
    unit: "mg/dL",
    value: 276,
  },
  {
    end_time: "2020-07-20T06:55:18.463Z",
    unit: "mg/dL",
    value: 123,
  }, {
    end_time: "2020-07-20T06:55:32.213Z",
    unit: "mg/dL",
    value: 100,
  }, {
    end_time: "2020-07-20T08:24:33.274Z",
    unit: "mg/dL",
    value: 12,
  },{
    end_time: "2020-07-20T09:19:32.334Z",
    unit: "mg/dL",
    value: 14,
  },{
    end_time: "2020-07-20T06:58:36.430Z",
    unit: "mg/dL",
    value: 298,
  }, {
    end_time: "2020-07-20T09:17:14.041Z",
    unit: "mg/dL",
    value: 276,
  },
  {
    end_time: "2020-07-19T06:55:18.463Z",
    unit: "mg/dL",
    value: 123,
  }, {
    end_time: "2020-07-19T06:55:32.213Z",
    unit: "mg/dL",
    value: 100,
  }, {
    end_time: "2020-07-19T08:24:33.274Z",
    unit: "mg/dL",
    value: 12,
  },{
    end_time: "2020-07-19T09:19:32.334Z",
    unit: "mg/dL",
    value: 14,
  },{
    end_time: "2020-07-19T06:58:36.430Z",
    unit: "mg/dL",
    value: 298,
  }, {
    end_time: "2020-07-19T09:17:14.041Z",
    unit: "mg/dL",
    value: 276,
  },
  {
    end_time: "2020-07-18T06:55:18.463Z",
    unit: "mg/dL",
    value: 123,
  }, {
    end_time: "2020-07-18T06:55:32.213Z",
    unit: "mg/dL",
    value: 100,
  }, {
    end_time: "2020-07-18T08:24:33.274Z",
    unit: "mg/dL",
    value: 12,
  },{
    end_time: "2020-07-18T09:19:32.334Z",
    value: 14,
    unit: "mg/dL"
  },{
    end_time: "2020-07-18T06:58:36.430Z",
    unit: "mg/dL",
    value: 157,
  }, {
    end_time: "2020-07-18T09:17:14.041Z",
    unit: "mg/dL",
    value: 276,
  },
  {
    end_time: "2020-07-17T06:55:18.463Z",
    unit: "mg/dL",
    value: 123,
  }, {
    end_time: "2020-07-17T06:55:32.213Z",
    unit: "mg/dL",
    value: 100,
  }, {
    end_time: "2020-07-17T08:24:33.274Z",
    unit: "mg/dL",
    value: 12,
  },{
    end_time: "2020-07-17T09:19:32.334Z",
    value: 14,
    unit: "mg/dL"
  },{
    end_time: "2020-07-17T06:58:36.430Z",
    unit: "mg/dL",
    value: 157,
  }, {
    end_time: "2020-07-17T09:17:14.041Z",
    unit: "mg/dL",
    value: 276,
  },
  {
    end_time: "2020-07-16T06:55:18.463Z",
    unit: "mg/dL",
    value: 123,
  }, {
    end_time: "2020-07-16T06:55:32.213Z",
    unit: "mg/dL",
    value: 100,
  }, {
    end_time: "2020-07-16T08:24:33.274Z",
    unit: "mg/dL",
    value: 12,
  },{
    end_time: "2020-07-16T09:19:32.334Z",
    value: 14,
    unit: "mg/dL"
  },{
    end_time: "2020-07-16T06:58:36.430Z",
    unit: "mg/dL",
    value: 157,
  }, {
    end_time: "2020-07-16T09:17:14.041Z",
    unit: "mg/dL",
    value: 276,
  },

  {
    end_time: "2020-07-15T06:55:18.463Z",
    unit: "mg/dL",
    value: 123,
  }, {
    end_time: "2020-07-15T06:55:32.213Z",
    unit: "mg/dL",
    value: 100,
  }, {
    end_time: "2020-07-15T08:24:33.274Z",
    unit: "mg/dL",
    value: 12,
  },{
    end_time: "2020-07-15T09:19:32.334Z",
    value: 14,
    unit: "mg/dL"
  },{
    end_time: "2020-07-15T06:58:36.430Z",
    unit: "mg/dL",
    value: 157,
  }, {
    end_time: "2020-07-15T09:17:14.041Z",
    unit: "mg/dL",
    value: 276,
  },

  {
    end_time: "2020-07-14T06:55:18.463Z",
    unit: "mg/dL",
    value: 123,
  }, {
    end_time: "2020-07-14T06:55:32.213Z",
    unit: "mg/dL",
    value: 100,
  }, {
    end_time: "2020-07-14T08:24:33.274Z",
    unit: "mg/dL",
    value: 12,
  },{
    end_time: "2020-07-14T09:19:32.334Z",
    value: 14,
    unit: "mg/dL"
  },{
    end_time: "2020-07-14T06:58:36.430Z",
    unit: "mg/dL",
    value: 157,
  }, {
    end_time: "2020-07-14T09:17:14.041Z",
    unit: "mg/dL",
    value: 276,
  },

  {
    end_time: "2020-07-13T06:55:18.463Z",
    unit: "mg/dL",
    value: 123,
  }, {
    end_time: "2020-07-13T06:55:32.213Z",
    unit: "mg/dL",
    value: 100,
  }, {
    end_time: "2020-07-13T08:24:33.274Z",
    unit: "mg/dL",
    value: 12,
  },{
    end_time: "2020-07-13T09:19:32.334Z",
    value: 13,
    unit: "mg/dL"
  },{
    end_time: "2020-07-13T06:58:36.430Z",
    unit: "mg/dL",
    value: 157,
  }, {
    end_time: "2020-07-13T09:17:13.041Z",
    unit: "mg/dL",
    value: 276,
  },
  {
    end_time: "2020-07-12T06:55:18.463Z",
    unit: "mg/dL",
    value: 123,
  }, {
    end_time: "2020-07-12T06:55:32.212Z",
    unit: "mg/dL",
    value: 100,
  }, {
    end_time: "2020-07-12T08:24:33.274Z",
    unit: "mg/dL",
    value: 12,
  },{
    end_time: "2020-07-12T09:19:32.334Z",
    value: 12,
    unit: "mg/dL"
  },{
    end_time: "2020-07-12T06:58:36.430Z",
    unit: "mg/dL",
    value: 157,
  }, {
    end_time: "2020-07-12T09:17:12.041Z",
    unit: "mg/dL",
    value: 276,
  },
  {
    end_time: "2020-07-11T06:55:18.463Z",
    unit: "mg/dL",
    value: 113,
  }, {
    end_time: "2020-07-11T06:55:32.211Z",
    unit: "mg/dL",
    value: 100,
  }, {
    end_time: "2020-07-11T08:24:33.274Z",
    unit: "mg/dL",
    value: 11,
  },{
    end_time: "2020-07-11T09:19:32.334Z",
    value: 11,
    unit: "mg/dL"
  },{
    end_time: "2020-07-11T06:58:36.430Z",
    unit: "mg/dL",
    value: 157,
  }, {
    end_time: "2020-07-11T09:17:11.041Z",
    unit: "mg/dL",
    value: 276,
  },
  {
    end_time: "2020-07-10T06:55:18.463Z",
    unit: "mg/dL",
    value: 103,
  }, {
    end_time: "2020-07-10T06:55:32.210Z",
    unit: "mg/dL",
    value: 100,
  }, {
    end_time: "2020-07-10T08:24:33.274Z",
    unit: "mg/dL",
    value: 10,
  },{
    end_time: "2020-07-10T09:19:32.334Z",
    value: 10,
    unit: "mg/dL"
  },{
    end_time: "2020-07-10T06:58:36.430Z",
    unit: "mg/dL",
    value: 157,
  }, {
    end_time: "2020-07-10T09:17:10.041Z",
    unit: "mg/dL",
    value: 276,
  },
  {
    end_time: "2020-07-09T06:55:18.463Z",
    unit: "mg/dL",
    value: 103,
  }, {
    end_time: "2020-07-09T06:55:32.210Z",
    unit: "mg/dL",
    value: 100,
  }, {
    end_time: "2020-07-09T08:24:33.274Z",
    unit: "mg/dL",
    value: 10,
  },{
    end_time: "2020-07-09T09:19:32.334Z",
    value: 10,
    unit: "mg/dL"
  },{
    end_time: "2020-07-09T06:58:36.430Z",
    unit: "mg/dL",
    value: 157,
  }, {
    end_time: "2020-07-09T09:17:10.041Z",
    unit: "mg/dL",
    value: 276,
  }
].reverse();
