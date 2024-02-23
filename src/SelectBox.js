import React from 'react'

export default function SelectBox({currencyData ,selectedCurrency,updateCurrency,updateInput,amount}) {
  // console.log('at selectBox' ,currencyData);
  if(!Array.isArray(currencyData)){
       return <h1>!Api call limit Exceeded!</h1>
  }
  return (
      <div>
           <input type='number' value={amount} onChange={updateInput}/>
           <select value={selectedCurrency} onChange={updateCurrency}>
              { currencyData.map(data => {
                  return (<option key = {data} value={data} >{data}</option>)
               })}
           </select>
      </div>
  )
}
