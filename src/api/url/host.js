let host = '/'
console.log('NODE_ENV:::', process.env.NODE_ENV)
// if (process.env.NODE_ENV === 'production') {
//   host = 'http://abtest.jr.jd.com/'
// } else if (process.env.NODE_ENV === 'testing') {
//   host = 'http://abtest.jr.jd.com/'
// }
if (process.env.NODE_ENV === 'production') {
  host = 'http://dsp.jr.jd.com/'
} else if (process.env.NODE_ENV === 'testing') {
  host = 'http://dsp.jr.jd.com/'
}
export default host
