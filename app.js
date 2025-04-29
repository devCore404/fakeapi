const getElement = (elementId) => document.getElementById(elementId);

//show data function
function showData(elementId){
    const showData = getElement(elementId)
    showData.classList.remove('d-none');
}

//hide data function
function hideData(elementId){
    const hideData = getElement(elementId)
    hideData.classList.add('d-none');
}

//create table heading funciton
function  createTableHeading(columns){
    return `
    <thead>
        <tr>
            ${columns.map(column => `<th scope="col">${column}</th>`).join('')}
        </tr>
    </thead>
    `
}

///fetching user data from fake store API
const showLoadingUser = () => getElement('userData').innerHTML = `<p class="text-success">Fetching Data . . . .</p>`;
const showErrorUser = (message) => getElement('userData').innerHTML = `<p class="text-danger">Error: ${message}</p>`;

let fetchUserData = async () => {
    let tempUserData = "";    //empty string to store data
    showData('userData');     //show user data section
    hideData('productData');   //hide product data section
    hideData('testingText');   //hide testing text
    showLoadingUser();        //display loading message
    try{
        hideData('searchUserData');     //before fetching success, hide search bar
        hideData('searchProductData');  //before fetching success, hide search bar
        let fetchingUser = await fetch("https://fakestoreapi.com/users");
        let gettingUser = await fetchingUser.json();
        showData('searchUserData');  //after fetching success, show search bar 
        gettingUser.forEach(user => {
            let firstName = user.name.firstname;  //get firstname of name{}
            let lastName = user.name.lastname;   //get lastname of name{}
            let fullName = `${firstName} ${lastName}`  //Combine them into one cell
            tempUserData += `
                <tbody>    
                    <tr>  
                    <td>${user.id}</td>
                    <td>${fullName}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    </tr>
                </tbody>
            `
        });
        const userTableColumns = ['Id', 'Name', 'Username', 'Email', 'Phone Number'];
        const userTableHeading = createTableHeading(userTableColumns);
        getElement('userData').innerHTML = userTableHeading + tempUserData;    
    }catch (error) {
        hideData('searchUserData');     //hide search bar section
        console.error("Error fetching data:", error);
        showErrorUser("Failed to fetch User Data");
    }  

}


///user data search function
function searchUserData(){
    const inputData = getElement('searchUserData');
    const toUpperCase = inputData.value.toUpperCase();
    console.log(toUpperCase);
    
    
}

///fetching prouduct data from fake store API
const showLoadingProduct = () => getElement('productData').innerHTML = `<p class="text-success">Fetching Data . . . .</p>`;
const showErrorProduct = (message) => getElement('productData').innerHTML = `<p class="text-danger">Error: ${message}</p>`;

let fetchProductData = async () => {
    let tempProductData = "";   //empty string to store data
    showData('productData');     //show product data section      //show search bar section
    hideData('userData');        //hide user data section 
    hideData('testingText');     //hide testing text
    showLoadingProduct();       //display loading message
    try{
        hideData('searchProductData');  //before fetching success, hide search bar
        hideData('searchUserData');    //before fetching success, hide search bar
        const fetchingProduct = await fetch("https://fakestoreapi.com/products");
        const gettingProduct = await fetchingProduct.json();
        showData('searchProductData');   //after fetching success, show search bar
        gettingProduct.forEach(product => {
            tempProductData += `
                <tbody>    
                    <tr>
                    <td>${product.id}</td>
                    <td><img src="${product.image}" style="width:80px"></img></td>
                    <td>${product.description}</td>
                    <td>${product.title}</td>
                    <td>${product.price}$</td>
                    <td>${product.rating.rate}</td>
                    </tr>
                </tbody>
            `
        });
        const productTableColumns = ['Id', 'Image', 'Description', 'Title', 'Price', 'Rating'];
        const productTableHeading = createTableHeading(productTableColumns);
        getElement('productData').innerHTML = productTableHeading + tempProductData;
    }catch (error){
        hideData('searchProductData');
        console.error("Error fetching Data:", error);
        showErrorProduct("Failed to fetch Product Data");
    } 
}

///product data search function
function searchProductData(){
    const inputData = getElement('searchUserData');
    const toUpperCase = inputData.value.toUpperCase();
    console.log(toUpperCase);
}
