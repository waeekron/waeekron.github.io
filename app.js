
class PopUpFrom extends HTMLElement {

    date = undefined;
    question = "";
    category = "HTML";

    constructor() {
        // Call super classes constructor
        super();
        
        // Create a shadow root
        this.attachShadow({mode: "open"});
        
        //styles
        let style = this.styles()
        
        //elements
        const button = document.createElement("button");
        button.textContent = "ADD";
        button.setAttribute("class", "button");

        button.onclick = () => {
            this.render();
        }

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(button);
    }   
    
    
    revert() {
        //clear everything
        while (this.shadowRoot.firstChild) {
            this.shadowRoot.firstChild.remove();
        }

        const button = document.createElement("button");
        button.textContent = "ADD";
        button.setAttribute("class", "button");

        button.onclick = () => {
            this.render();
        }

        this.shadowRoot.appendChild(this.styles());
        this.shadowRoot.appendChild(button);

    }


    render() {
        this.date = new Date().toString();
        this.shadowRoot.querySelector(".button").remove();

        let div = document.createElement("div");
        div.setAttribute("class","container");

        let left = document.createElement("div");
        left.setAttribute("class", "left");

        let right = document.createElement("div");
        right.setAttribute("class", "right");

        let label = document.createElement('label'); label.setAttribute('id','label');
        label.textContent = 'Question for the guru: ';

        let input = document.createElement('textarea');

        let saveBtn = document.createElement('button');
        let cancelBtn = document.createElement('button');

        saveBtn.textContent = 'Save';
        cancelBtn.textContent = 'Cancel';

        saveBtn.setAttribute("class", "button")
        cancelBtn.setAttribute("class", "button")
        input.setAttribute("class", "input");
        input.setAttribute("autofocus", "autofocus");


        //select menu
        let select = document.createElement("select");
        let optionHTML = document.createElement("option");
        let optionCSS = document.createElement("option");
        let optionJS = document.createElement("option");

        select.setAttribute("class", "menu");
        optionHTML.textContent = "HTML";
        optionCSS.textContent = "CSS";
        optionJS.textContent = "JS";

        select.appendChild(optionHTML);
        select.appendChild(optionCSS);
        select.appendChild(optionJS);


        //Events
        input.onchange = () => {
            this.question = input.value;
        }

        select.onchange = () => {
            this.category = select.value;
        }

        saveBtn.onclick = () => {

            if (this.validateData()) {
                    this.storeData();
                    this.revert();
            }
        }

        cancelBtn.onclick = () => {
            console.log("CANCELED");
            this.revert();
        }

        let meta = document.createElement("meta");
        meta.setAttribute("name","viewport");
        meta.setAttribute("content","width=device-width, initial-scale=1, user-scalable=no");

        // Append everything
        left.appendChild(label);
        left.appendChild(input);

        right.appendChild(select);
        right.appendChild(saveBtn);
        right.appendChild(cancelBtn);

        div.appendChild(left);
        div.appendChild(right);
        this.shadowRoot.append(meta);
        this.shadowRoot.appendChild(this.styles());
        this.shadowRoot.appendChild(div);
    }

    connectedCallback() {
        console.log('succes');
        this.shadowRoot.addEventListener("save", function(e) {
            console.log("saved");
        })
    }


    disconnectedCallback() {
       
    }


    styles() {
        let style = document.createElement("style");
        style.textContent = `

        .left { 
            display: grid;
            grid-template-columns: 1fr;
        }

        label {
            margin-top: 1em;
            color: dimgray;
            font-size: 2em;
            display: block;
        }
        
        .button {
            background-color: white; 
            border: none;
            color: #2F4F4F;
            font-size: 24px; 
        }

        .button:hover {
            color:white;
            background-color: black;
        }

        button {
            background-color: black;
            padding: .5em;
            margin: 0.5em;
        }

        button:hover {
            background-color: white;
            color: coral
        }

        select {
            background-color: white;
        }

        textarea {
            margin: 3em;
            outline: none;
            resize: none;
            overflow: auto;
            height: 150px;
        }

        .right {  
            display:grid;
            grid-template-rows: .8fr 1fr 1fr;
            row-gap: 1ch;
        }

        .container {
            background-color: black;
            margin-left: 10%;
            margin-right: 10%;
        }
        `;

        return style;
    }


    validateData() {
        if (this.question === undefined || this.question.length < 4) {
            alert("check input");
            return false;
        }
        return true;
    }

    storeData() {
        //console.log(this.parseData());
        //console.log(typeof (this.parseData()))
        localStorage.setItem(this.date.toString(), JSON.stringify(this.parseData()) );
    }


    parseData() {
        let dataObject = {
            question : this.question,
            category : this.category,
            date : this.date
        }
        return dataObject;
    }

}


/**---------------------------    APP LOGIC    --------------------------- */


customElements.define('pop-up', PopUpFrom);

document.body.addEventListener("click", () => {
    
    //check if the local storage has changed?
    if(localStorage.length > items.length) {
        console.log(localStorage.length + " <- localstrg.length, items.lnght: " + items.length);
        //myStorage = localStorage;
    }

    // Delete all child nodes
    while(document.body.querySelector(".questions").firstChild) {
        document.body.querySelector(".questions").firstChild.remove();
    }
    
    items = [];
    

    for (let i = 0; i < myStorage.length; i++) {
        let item = myStorage.getItem(myStorage.key(i));
        item = JSON.parse(item);
        items.push(item);
    }

    items.sort( (a, b) => {
        const d1 = new Date(a.date);
        const d2 = new Date(b.date);
        return d2 - d1;
    })
    
    // If we have slected a category we only load items of a given category for display
    if (selectedCategory != "all") {
        loadFilteredPosts(filterWithCondition(select.value));
        return;
    }

    items.forEach( item => {
        const div = updatePosts(item);
        document.body.querySelector(".questions").appendChild(div);
    })

})


function updatePosts(item) {
    let div = document.createElement("div");
    div.setAttribute("class","post");
    let para = document.createElement("para");
    para.textContent = item.question;
    para.setAttribute("class",item.category);
    div.appendChild(para);
    return div;
}


function loadPosts() {
    // Read localstorage
    for (let i = 0; i < myStorage.length; i++) {
        let item = myStorage.getItem(myStorage.key(i));
        item = JSON.parse(item);
        items.push(item);
    }

    //sort the read items
    items.sort( (a, b) => {
        const d1 = new Date(a.date);
        const d2 = new Date(b.date);
        return d2 - d1;
    })

    items.forEach( item => {
        const div = updatePosts(item);
        document.body.querySelector(".questions").appendChild(div);
    })
}


let items = [];
let form;
let myStorage = window.localStorage;

window.onload = () => {
    return  (myStorage.length > 0 ? loadPosts() : console.log("No questions available.")); 
}


let select = document.body.querySelector(".select");

let selectedCategory = "all";

select.onchange = () => {
    selectedCategory = select.value;
    loadFilteredPosts(filterWithCondition(select.value));
}


function filterWithCondition(condition) {
    return condition == "all" ? items
        : condition == "html" ? items.filter( item => item.category == "HTML" )
        : condition == "css" ? items.filter( item => item.category == "CSS" )
        : items.filter( item => item.category == "JS" );        
}


function loadFilteredPosts(filteredItems) {

    while(document.body.querySelector(".questions").firstChild) {
        console.log("poistetaan");
        document.body.querySelector(".questions").firstChild.remove();
    }

    filteredItems.forEach( item => {
        const div = updatePosts(item);
        document.body.querySelector(".questions").appendChild(div);
    })
}





