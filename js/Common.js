
let get_req = new AbortController();
let save_req = new AbortController();

const inr = new Intl.NumberFormat('en-IN', { 
	style: 'currency', 
	currency: 'INR', 
	minimumFractionDigits: 2, 
}); 

function transformDate(date) {
    const newDate = new Date(date * 1000);
    return `${newDate.getDate()} ${newDate.toLocaleString('default', { month: 'short' })} ${newDate.getFullYear()}`;
}

async function loadData(sidebar_choice) {
    get_req.abort();
    get_req = new AbortController();
    try {
        const response = await fetch(`https://rzp-training.herokuapp.com/team2/${sidebar_choice}`, { signal: get_req.signal });
        const data = await response.json();
        return data;
    }
    catch (error) {
        if (error.name === 'AbortError')
            return;
        return error;
    }
}

async function PostForm(obj, sidebar_choice, changeContentChoice) {
    try {
        const response = await fetch(`https://rzp-training.herokuapp.com/team2/${sidebar_choice}`, { method: "POST", 
            body: JSON.stringify(obj), headers: { "Content-type": "application/json; charset=UTF-8"}, signal: save_req.signal
        });
        const data = await response.json();
        if (data.statusCode === 400)
            alert(data.error.description);
        else if (data.entity === sidebar_choice.slice(0, sidebar_choice.length - 1) || data.id)
            changeContentChoice('list');
        else
            alert(data);
    }
    catch (error) {
        alert(error);
    }
}

function TableHead(...arr) {
    return <thead> 
        <tr>
            {arr.map((element, index) => (
                <th key={index}>{element}</th>
            ))}
        </tr>
    </thead>;
}

function TableBody(items, ...arr) {
    return <tbody>
        {items.map(item => (
            <tr key={item.id}>
                {arr.map(element => {
                    if (element === 'amount')
                        return <td>{inr.format(item[element] / 100)}</td>;
                    else if (element === 'created_at')
                        return <td>{transformDate(item[element])}</td>;
                    else
                        return <td>{item[element]}</td>;
                })}
            </tr>
        ))}
    </tbody>;
}

