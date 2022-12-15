import "./App.css"
import { useState, useEffect } from "react"
import axios from "axios"

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function App() {
  const [total_order_cost, setTotal] = useState(0)
  const [cartItems, setCartItems] = useState({})
  const [items, setItems] = useState([])
  const [formName, setFormName] = useState("")
  const [formCardNumber, setFormCardNumber] = useState("")
  const [loader, setLoader] = useState(false)
  const [orderStatus, setOrderStatus] = useState("Placing order...")

  const addItemToCart = (price, itemName) => {
    if (price === "" || itemName === "") {
      return
    }
    const floatPrice = parseFloat(price)
    setTotal(total_order_cost + floatPrice)

    let cartItemCopy = { ...cartItems }
    if (itemName in cartItemCopy) {
      cartItemCopy[itemName] += 1
    } else {
      cartItemCopy[itemName] = 1
    }
    setCartItems(cartItemCopy)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoader(true)
    await sleep(1000)

    axios
      .post("http://localhost:8080/place_order", {
        card_number: formCardNumber,
        total_order_cost: total_order_cost
      })
      .then(function (response) {
        console.log(response.data)
        setOrderStatus(response.data.msg)
      })
      .catch(function (error) {
        setOrderStatus("There was an error")
      })
    await sleep(3000)
    setLoader(false)
    setOrderStatus("Placing order...")
  }

  useEffect(() => {
    // grab all items from mongoDB, using API
    // backend server must be running
    axios.get("http://localhost:8080/all_items").then(function (response) {
      setItems(response.data)
    })
  }, [])

  return (
    <div>
      <div
        style={{ display: loader ? "block" : "none" }}
        className="place_order_overlay"
      >
          <div className="loader"></div>
          <div className="loader_text">{orderStatus}</div>
      </div>
      <div className="main_wrapper">
        <div className="cart">
          <div className="my_cart_title">My Cart</div>

          <table>
            <tbody>
              <tr>
                <th>Item Name</th>
                <th>Qty</th>
              </tr>
              {Object.keys(cartItems).map((name, i) => {
                return (
                  <tr key={i}>
                    <td>{name}</td>
                    <td>{cartItems[name]}</td>
                  </tr>
                )
              })}
              <tr>
                <td></td>
                <td>Total: ${total_order_cost.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <form className="card_form" onSubmit={(e) => handleSubmit(e)}>
            <div className="input_box">
              <label htmlFor="name">Name: </label>
              <input type="text" id="name" name="name" required></input>
            </div>
            <div className="input_box">
              <label htmlFor="card_number">Card #: </label>
              <input
                value={formCardNumber}
                type="text"
                name="card_number"
                id="card_number"
                required
                pattern="[0-9]{16}"
                onChange={(e) => setFormCardNumber(e.target.value)}
              />
            </div>
            <div className="place_order_btn">
              <input className="submit_btn" type="submit" value="Place Order" />
            </div>
          </form>
        </div>

        <h1>Starbuzz coffee beverages</h1>

        {items
          ? items.map((elem, i) => {
              return (
                <div key={i}>
                  <h2>
                    {elem.name} ${elem.price}
                  </h2>
                  <p>{elem.desc}</p>
                  <div
                    className="add_to_cart_btn"
                    onClick={() => addItemToCart(elem.price, elem.name)}
                  >
                    Add to cart
                  </div>
                </div>
              )
            })
          : "No items to display"}
      </div>
    </div>
  )
}

export default App
