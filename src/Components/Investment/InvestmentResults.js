import styles from "./InvestmentResults.module.css";
function InvestmentResults(props){

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      if(props.results.length === 0){
        return <p style={{textAlign: 'center'}}>No investment calculated yet.</p>;
      }


    return (
        <table className={styles.result}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Total Savings</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
          {props.results.map((result) => 
            <tr key={result.year}>
            <td>{result.year}</td>
            <td>{formatter.format(result.savingsEndOfYear)}</td>
            <td>{formatter.format(result.yearlyInterest)}</td>
            <td>
              {formatter.format(
                result.savingsEndOfYear -
                  props.initialInvestment -
                  result.yearlyContribution * result.year
              )}
            </td>
            <td>
              {formatter.format(
                props.initialInvestment +
                result.yearlyContribution * result.year
              )}
            </td>
          </tr>
          )}
        </tbody>
      </table>
    )
}
export default InvestmentResults