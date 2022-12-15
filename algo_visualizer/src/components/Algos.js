import React from "react"

function Algos({ sendArr, arr }) {
  let currArrState = []

  const insertionSort = (inputArr) => {
    let newArr = Array.from(inputArr) // this is done, so we don't manipulate PROP arr

    let n = newArr.length
    for (let i = 1; i < n; i++) {
      let current = newArr[i]
      let j = i - 1
      while (j > -1 && current < newArr[j]) {
        newArr[j + 1] = newArr[j]

        let t = newArr[j + 1]
        newArr[j + 1] = " "
        currArrState.push(newArr.slice(0))
        newArr[j + 1] = t
        currArrState.push(newArr.slice(0))

        j--
      }

      newArr[j + 1] = current
      currArrState.push(newArr.slice(0))
    }
    sendArr(currArrState)
    currArrState = []
  }

  const bubbleSort = (inputArr) => {
    let newArr = Array.from(inputArr) // this is done, so we don't manipulate PROP arr

    let len = newArr.length
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (newArr[j] > newArr[j + 1]) {
          let tmp = newArr[j]
          newArr[j] = newArr[j + 1]
          newArr[j + 1] = tmp
          currArrState.push(newArr.slice(0))
        }
      }
    }

    sendArr(currArrState)
    currArrState = []
  }

  function merge(left, right) {
    let arr = []
    while (left.length && right.length) {
      if (left[0] < right[0]) {
        arr.push(left.shift())
      } else {
        arr.push(right.shift())
      }
    }

    currArrState.push([...arr, ...left, ...right])
    return [...arr, ...left, ...right]
  }

  function mergeSort(inputArr) {
 
    const half = inputArr.length / 2

    // Base case
    if (inputArr.length < 2) {
      return inputArr
    }

    const left = inputArr.splice(0, half)

    return merge(mergeSort(left), mergeSort(inputArr))
  }

  const mergeSortWrapper = (inputArr) => {
    let newArr = Array.from(inputArr)
    mergeSort(newArr)
    sendArr(currArrState)
    currArrState = []
  }

  return (
    <div>
      <div>Algorithms</div>

      <button onClick={() => bubbleSort(arr)}>Bubble Sort</button>
      <button onClick={() => insertionSort(arr)}>Insertion Sort</button>
      <button onClick={() => mergeSortWrapper(arr)}>Merge Sort</button>
    </div>
  )
}

export default Algos
