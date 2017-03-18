export default function *(next) {
  try {
    yield next;
  } catch (err) {
    this.status = err.staus || 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
}
