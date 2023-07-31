import React,{useState} from 'react';
import Header from './Components/UI/Header';
import InvestmentForm from "./Components/Investment/InvestmentForm";
import InvestmentResults from "./Components/Investment/InvestmentResults";

function App() {
  
  const [yearlyresuls,setYearyResults] = useState(null); 
  const [currentSavings,setCurrentSavings] = useState(null); 

  function onFormSubmited(results,userInputCurrentSavings){
    setYearyResults(results);
    setCurrentSavings(userInputCurrentSavings);
  }
 

  return (
    <div>
      <Header />

     <InvestmentForm onFormSubmited={onFormSubmited}/>

      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}

      {yearlyresuls===null ? <p style={{textAlign: 'center'}}>No investment calculated yet.</p> : <InvestmentResults results={yearlyresuls} initialInvestment={currentSavings}/>}
    
    </div>
  );
}

export default App;
