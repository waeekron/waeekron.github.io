    function createPara() {
        let userInput = document.getElementById('Input').value;
        if (userInput == '') return;
        let para = document.createElement('p');
        para.textContent = userInput;
        para.id = runningId;
        runningId++;
        document.getElementById('notations').appendChild(para);
        document.getElementById(para.id).addEventListener('click', setAsSelected);
        emptyInputField();
        
    }


    function deletePara() {
        const paras = document.querySelectorAll('p');
        //paras[paras.length-1].remove();
        for (let i = 0; i < paras.length; i++) {
            if (paras[i].style.backgroundColor === "maroon") { //vaihda
                console.log(paras[i].innerHTML);
                deletedEntries.push(paras[i].innerHTML);
                paras[i].remove();
            }
        }
        updateDeleted();
    }


    //Updates the last deleted item to a div element that contains all the deleted tasks.
    function updateDeleted() {
        //document.getElementById('deleted').innerHTML='';
        
        let para = document.createElement('p');
        para.id = 'delete';
        for(let i = 0; i < deletedEntries.length; i++) {
            para.textContent = deletedEntries[i];
            document.getElementById('deleted').appendChild(para);
        }
        
    }


    function emptyInputField() {
        document.getElementById('Input').value='';
    }


    function setAsSelected() {
        let deleteColor = '#9A1750'
        if(document.getElementById(this.id).style.backgroundColor == "maroon") { //vaihda
            document.getElementById(this.id).style.backgroundColor = "#1F2833";
            document.getElementById(this.id).addEventListener('mouseenter', function(event) {
                if(document.getElementById(this.id).style.backgroundColor === "maroon") {return;} //vaihda
                event.target.style.backgroundColor = "#45A29E";
            });
            document.getElementById(this.id).addEventListener('mouseleave', function(event) {
                if(document.getElementById(this.id).style.backgroundColor === "maroon") {return;} //vaihda
                event.target.style.backgroundColor = "#1F2833";
            });
            return;
        }

        
        document.getElementById(this.id).style.backgroundColor = "maroon"; // vaihda
    }


    function empty() {
        deletedEntries = [];
        let nodes = document.getElementById('deleted').children;
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].id === 'delete') {
                nodes[i].remove();
            }
        }
        
    }

    const emptyButton = document.getElementById('Empty').addEventListener('click',empty);
    const button = document.getElementById('Remove').addEventListener('click',deletePara);
    const buttons = document.getElementById('Add').addEventListener('click', createPara);
    let runningId = 1;

    let deletedEntries = [];

   

    
