function Counter() {
    const [counter, setCounter] = React.useState(0);
    return <>
        <h1>Hello world!</h1>
        <h3>Counter: {counter}</h3>
        <button onClick={() => setCounter(counter+1)}>Increment count</button>
    </>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Counter/>);