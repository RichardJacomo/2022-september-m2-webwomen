function rescueJSON(){  
const getPosts = localStorage.getItem("vagas");
if(getPosts){
const postsFound = JSON.parse(getPosts);
render(postsFound)  
}
}
rescueJSON()

// main list content
function renderMain(array) {
    const postUl = document.querySelector('.post-ul')
    array.forEach((e) => {
      const card = createMainCard(e);
      postUl.appendChild(card);
    });
  }

function createMainCard(e){
    const li = document.createElement("li");
    const h2 = document.createElement("h2");
    const divInterprise = document.createElement("div");
    const pInterprise = document.createElement("p");
    const pCity = document.createElement("p");
    const pDescription = document.createElement("p");
    const divTypeAply = document.createElement("div");
    const pType = document.createElement("p");
    const buttonAply = document.createElement("button");
    const buttonHiden = document.createElement("button");

    li.classList = 'post-li'
    h2.classList = 'post-title'
    divInterprise.classList = 'interprise'
    pInterprise.classList = 'text-interprise'
    pCity.classList = 'text-city'
    pDescription.classList = 'post-description'
    divTypeAply.classList = 'div-type-and-aply'
    pType.classList = 'job-type'
    buttonAply.classList = 'aply'
    buttonHiden.classList = 'remove none'

    h2.innerText = e.title
    pInterprise.innerText = e.enterprise
    pCity.innerText = e.location
    pDescription.innerText = e.descrition
    pType.innerText = e.modalities
    buttonAply.id = `fiv_${e.id}`
    buttonAply.innerText = 'Candidatar'
    buttonHiden.id = `del_${e.id}`
    buttonHiden.innerText = 'Remover'

    li.append(h2, divInterprise, pDescription, divTypeAply)
    divInterprise.append(pInterprise, pCity)
    divTypeAply.append(pType, buttonAply, buttonHiden)

    return li
}
renderMain(jobsData)

// selected list content
function render(array) {
    const selectedtUl = document.querySelector('.selected-ul')
    array.forEach((e) => {
      const card = createCard(e);
      selectedtUl.appendChild(card);   
    });
  }

function createCard(e){
        const li = document.createElement("li");
        const divTitleBuutton = document.createElement("div");
        const h3 = document.createElement("h3");
        const buttonDelete = document.createElement("button");
        const divInterpriseCity = document.createElement("div");
        const pSelectedInterprise = document.createElement("p");
        const pSelectedCity = document.createElement("p");
    
        li.classList = 'selected-li'
        divTitleBuutton.classList = 'div-title-and-button'
        h3.classList = 'selected-title'
        buttonDelete.classList = 'selected-button'
        divInterpriseCity.classList = 'div-interprise-and-city'
        pSelectedInterprise.classList = 'selected-interprise'
        pSelectedCity.classList = 'selected-city'
    
        h3.innerText = e.title
        pSelectedInterprise.innerText = e.enterprise
        pSelectedCity.innerText = e.location
        buttonDelete.innerHTML = '<img src="./assets/img/delete.png" alt="delete"></button>'
        li.id = `fav_${e.id}`
        buttonDelete.id = `fiv_${e.id}`
        li.append(divTitleBuutton, divInterpriseCity)
        divTitleBuutton.append(h3, buttonDelete)
        divInterpriseCity.append(pSelectedInterprise, pSelectedCity)  
        return li
}

const selectedUlJobs = document.querySelector('.selected-ul')
const aplyButtonsJob = document.querySelectorAll('.aply') 
const clickedButtonsJob = document.querySelector('.button-clicked') 

const newArrayJob = []
const newArraySaved = []
function aplyToJob(){
    aplyButtonsJob.forEach((element, index) => {
        const aplyButton = element
        const id = parseInt(aplyButton.id.substring(4)); 
        aplyButton.addEventListener('click', function(e){
            
            const productID = jobsData[index].id
            if(id == productID){
                newArrayJob[index] = jobsData[index]
                selectedUlJobs.innerHTML = ''
                selectedUlJobs.insertAdjacentHTML('afterbegin', `<div class="empty">
                    <h2 class="empty-title">Vagas selecionadas</h2>
                    <p class="empty-text">Você ainda não aplicou para nenhuma vaga</p>
                </div>`)                         
                let buttonHiden = document.getElementById(`del_${id}`); 
                aplyButton.classList.toggle('button-clicked'); 
                buttonHiden.classList.toggle('none');  
                // atualizando localStorage
                const productsJson = JSON.stringify(newArrayJob);
                localStorage.setItem("vagas", productsJson);
                const cartLocalJSON = localStorage.getItem("vagas");
                const cartLocal = JSON.parse(cartLocalJSON);
                console.log(cartLocal)
                render(cartLocal)  
                deleteJob(aplyButton)      
             } 
        }) 
    });
}
aplyToJob()

function deleteJob(aplyButton){
const selectedButtons = document.querySelectorAll('.selected-button')
selectedButtons.forEach((element, index) => {
    const selectedButtonJob = element
    const id = parseInt(selectedButtonJob.id.substring(4)); 
    selectedButtonJob.addEventListener('click', function(e){
      const productID = jobsData[index].id
          if(id == productID){ 
              newArrayJob.pop()
              let li = document.getElementById(`fav_${id}`);          
              li.remove(); 
              let buttonRemove = document.getElementById(`del_${id}`); 
              let buttonAply = document.getElementById(`fiv_${id}`);
              buttonRemove.classList.toggle('none'); 
              buttonAply.classList.toggle('button-clicked'); 
              // atualizando localStorage
              const productsJson = JSON.stringify(newArrayJob);
              localStorage.setItem("vagas", productsJson);
          } 
    }) 
});  
}
deleteJob()

const hidenButtons = document.querySelectorAll('.remove') 
function hideButtonChange(){
  hidenButtons.forEach((element, index) => {
    const hideButton = element
    hideButton.addEventListener('click', (e) =>{
    const id = parseInt(hideButton.id.substring(4)); 
    const productID = jobsData[index].id
      if(id == productID){ 
        newArrayJob.pop()
        let li = document.getElementById(`fav_${id}`);          
        li.remove(); 
        let buttonAply = document.getElementById(`fiv_${id}`); 
        buttonAply.classList.toggle('button-clicked'); 
        hideButton.classList.toggle('none'); 
        // atualizando localStorage
        const productsJson = JSON.stringify(newArrayJob);
        localStorage.setItem("vagas", productsJson);
    } 
    })
  });
}
hideButtonChange()

/*o projeto está salvando corretamente no localStorage e fazendo a busca e conversão 
corretamente da string do localStorage pelo JSON e se der F5 não perde os dados,
mas ao pressionar F5 com dados salvos no localStorage, os botões de remover(Remover)
somem e dão lugar ao bottão de adicionar(Candidatar), então isso acaba causando um bug no
código porque os botões não estão sendo salvos no localStorage, apenas a array de objetos, porém todos
os botões funcionam corretamente*/















