// const arr1 = [1, 2, 3, 4, 5];
// console.log(arr1);
// //clear arr1
// arr1.length = 0;
// console.log(arr1);

let interval;
function createInterval(socket, msg) {
    interval = setInterval(() => {
        console.log("emit message");
    }, 1000);
}
// clear interval after 10s
createInterval();
setTimeout(() => {
    setTimeout(() => {
        clearInterval(interval);
        console.log("clear interval");
    }, 10000);
    console.log("before clear interval");
}, 5000);
