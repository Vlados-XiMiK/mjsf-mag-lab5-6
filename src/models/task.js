import md5 from 'md5'
export class Task {
  static TS_COMPLETED = 'completed'
  static TS_INCOMPLETED = 'incompleted'

  constructor(data = null) {
    this.id = md5(Date.now())
    this.title = data ? data.title: "";
    this.description =data ? data.description: "";
    this.status = data ? data.status: Task.TS_INCOMPLETED;
  }
}
export let taskConverter = {
  toFirestore: function(model) {
    return {
      title: model.title,
      description: model.description,
      status: model.status
    }
  },
  fromFirestore: function(snapshot, options){
    console.log(snapshot);
    console.log(options);
    const data = snapshot.data(options);
    return new Task(data);
  }
}
