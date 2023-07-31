import React,{useState} from "react";
import styles from "./InvestmentForm.module.css";

function InvestmentForm(props){
  
  
    const [currentSavings,setCurrentSavings] = useState(0);
    const [yearlyContribution,setYearlyContribution] = useState(0);
    const [expectedReturn,setExpectedReturn] = useState(0);
    const [duration,setDuration] = useState(0);

    const calculateHandler = (userInput) => {
        // Should be triggered when form is submitted
        // You might not directly want to bind it to the submit event on the form though...
    
        const yearlyData = []; // per-year results
    
        let currentSavings = +userInput['currentSavings']; // feel free to change the shape of this input object!
        const yearlyContribution = +userInput['yearlyContribution']; // as mentioned: feel free to change the shape...
        const expectedReturn = +userInput['expectedReturn'] / 100;
        const duration = +userInput['duration'];
    
        // The below code calculates yearly results (total savings, interest etc)
        for (let i = 0; i < duration; i++) {
          const yearlyInterest = currentSavings * expectedReturn;
          currentSavings += yearlyInterest + yearlyContribution;
          yearlyData.push({
            // feel free to change the shape of the data pushed to the array!
            year: i + 1,
            yearlyInterest: +yearlyInterest,
            savingsEndOfYear: +currentSavings,
            yearlyContribution: +yearlyContribution,
          });
        }
        
        // do something with yearlyData ...
      
        return yearlyData;
    };

    function formSubmitionHandler(event){
        event.preventDefault();
     
        
        const userInput = {
            currentSavings : +currentSavings,
            yearlyContribution : +yearlyContribution,
            expectedReturn : +expectedReturn,
            duration : +duration
        }
        
        const results = calculateHandler(userInput);
        
        props.onFormSubmited(results,userInput.currentSavings);
    }
    
    function currentSavingsChangedHandler(event){
        setCurrentSavings(event.target.value);
    }
    function yearlyContributionChangedHandler(event){
        setYearlyContribution(event.target.value);
    }
    function expectedReturnChangedHandler(event){
        setExpectedReturn(event.target.value);
    }
    function durationChangedHandler(event){
        setDuration(event.target.value);
    }
  
    function formResetHandler(){
        setCurrentSavings(0);
        setYearlyContribution(0);
        setExpectedReturn(0);
        setDuration(0);
        props.onFormSubmited(null,null);
    }
  
  
  
    return (
        <form className={styles.form}>
        <div className={styles["input-group"]}>
          <p>
            <label htmlFor="current-savings">Current Savings ($)</label>
            <input onChange={currentSavingsChangedHandler} type="number" id="current-savings" />
          </p>
          <p>
            <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
            <input onChange={yearlyContributionChangedHandler} type="number" id="yearly-contribution" />
          </p>
        </div>
        <div className={styles["input-group"]}>
          <p>
            <label htmlFor="expected-return">
              Expected Interest (%, per year)
            </label>
            <input onChange={expectedReturnChangedHandler} type="number" id="expected-return" />
          </p>
          <p>
            <label htmlFor="duration">Investment Duration (years)</label>
            <input onChange={durationChangedHandler} type="number" id="duration" />
          </p>
        </div>
        <p className={styles.actions}>
          <button onClick={formResetHandler} type="reset" className={styles.buttonAlt}>
            Reset
          </button>
          <button onClick={formSubmitionHandler} type="submit" className={styles.button}>
            Calculate
          </button>
        </p>
      </form>
    )
}

export default InvestmentForm