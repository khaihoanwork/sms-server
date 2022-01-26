// const arr1 = [1, 2, 3, 4, 5];
// console.log(arr1);
// //clear arr1
// arr1.length = 0;
// console.log(arr1);

// log current time with timezone +7 format vietnam
const d = new Date();
const time = d.toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
});
console.log("current time : " + time);
