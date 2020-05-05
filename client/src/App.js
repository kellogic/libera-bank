import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Navbar, Row, Col } from 'react-bootstrap';
import BankService from './BankService';
import './App.css';

const bankService = new BankService();

function App() {
    const [balance, setBalance] = useState(0);
	const [list, setList] = useState([]);
	const [change, setChange] = useState(0);
	const [quarters, setQuarters] = useState(0);
	const [dimes, setDimes] = useState(0);
	const [nickels, setNickels] = useState(0);
	const [pennies, setPennies] = useState(0);
	const [addMode, setAddMode] = useState(true);
	const [result, setResult] = useState([]);
	const [error, setError] = useState();

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        const data = await bankService.getBalance();
        setBalance(data);
        const coins = await bankService.getCoins();
        setList(coins);
	}
	
	async function makeChange() {
		setError('');
		const res = await bankService.getChange(change);
		if (res.code) {
			setError(res.msg);
			setResult([]);
		}
		else {
			setResult(res.coins);
		}
		getData();
	}

	async function updateCoins() {
		if (addMode) {
			await bankService.addCoins(quarters, dimes, nickels, pennies);
			getData();
		}
		else {
			await bankService.replaceCoins(quarters, dimes, nickels, pennies);
			getData();
		}
	}

    return (
		<div className="app">
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand>Libera Bank</Navbar.Brand>
			</Navbar>
			<div className="main-content">
				<h4 className="mb-4">Current Balance: ${balance.toFixed(2)}</h4>
				<div className="d-flex">
					<Card className="mb-4 w-25">
						<Card.Header><strong>Coins Available</strong></Card.Header>
						<Card.Body>
							{list.map((item, idx) => {
								return (
									<div className="d-flex p-2" key={idx}>
										<div className="w-50">{item.name}s:</div> <div className="w-50">{item.count}</div>
									</div>
								)})
							}
						</Card.Body>
					</Card>
					<Card className="mb-4 ml-4">
						<Card.Header><strong>Add or Replace Coins</strong></Card.Header>
						<Card.Body>
							<Form>
								<Form.Group as={Row}>
									<Form.Label column sm={4}>Quarters</Form.Label>
									<Col sm={8}>
										<Form.Control
											type="number"
											id="quarters"
											value={quarters}
											onChange={e => setQuarters(e.target.valueAsNumber)}
										/>
									</Col>
								</Form.Group>
								<Form.Group as={Row}>
									<Form.Label column sm={4}>Dimes</Form.Label>
									<Col sm={8}>
										<Form.Control
											type="number"
											id="dimes"
											value={dimes}
											onChange={e => setDimes(e.target.valueAsNumber)}
										/>
									</Col>
								</Form.Group>
								<Form.Group as={Row}>
									<Form.Label column sm={4}>Nickels</Form.Label>
									<Col sm={8}>
										<Form.Control
											type="number"
											id="nickels"
											value={nickels}
											onChange={e => setNickels(e.target.valueAsNumber)}
										/>
									</Col>
								</Form.Group>
								<Form.Group as={Row}>
									<Form.Label column sm={4}>Pennies</Form.Label>
									<Col sm={8}>
										<Form.Control
											type="number"
											id="pennies"
											value={pennies}
											onChange={e => setPennies(e.target.valueAsNumber)}
										/>
									</Col>
								</Form.Group>
								<Form.Check
                                    type="radio"
                                    id="add"
                                    label="Add coins"
                                    checked={addMode}
                                    onChange={e => setAddMode(e.target.checked)}
                                />
								<Form.Check
                                    type="radio"
                                    id="reset"
                                    label="Replace coins"
                                    checked={!addMode}
                                    onChange={e => setAddMode(!e.target.checked)}
                                />
							</Form>
						</Card.Body>
						<Card.Footer>
							<Button className="" onClick={updateCoins}>Submit</Button>
						</Card.Footer>
					</Card>
					<Card className="mb-4 ml-4 w-25">
						<Card.Header><strong>Make Change</strong></Card.Header>
						<Card.Body>
							<Form className="mb-3">
								<Form.Label>Change Needed (cents)</Form.Label>
								<Form.Control
									type="number"
									id="change"
									value={change}
									onChange={e => setChange(e.target.valueAsNumber)}
									min="0"
									max="99"
								/>
							</Form>
							{result.length ? <div><strong>Change</strong></div> : ''}
							{result.map((item, idx) => {
								return (
									<div className="d-flex p-2" key={idx}>
										<div className="w-50">{item.name}s:</div> <div className="w-50">{item.count}</div>
									</div>
								)})
							}
							{error &&
								<div className="text-danger"><strong>{error}</strong></div>
							}
						</Card.Body>
						<Card.Footer>
							<Button className="" onClick={makeChange}>Make Change</Button>
						</Card.Footer>
					</Card>
				</div>
			</div>
		</div>
    );
}

export default App;
