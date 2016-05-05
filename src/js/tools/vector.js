
//Little util to make an arbitrary length array you can .map through.
export default function(n) {
    let arr = Array.apply(null, Array(n));
    return arr.map((x, i) => i);
}