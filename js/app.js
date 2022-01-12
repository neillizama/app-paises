class Pais extends HTMLElement{
    constructor(){
        super();
        this.url;   
        this.onRegion = this.onRegion.bind(this);     
    }

    static get observedAttributes(){
        return ['url'];
    }

    attributeChangedCallback(nameAtr,oldValue,newValue){
        switch (nameAtr) {
            case 'url':
                this.url = newValue;
                break;       
        }
    }

    addButtonListeners() {
        const openModal = this.getElementsByClassName('open-modal');  
        const openModal2 = this.querySelectorAll('.open-modal');  
        openModal2.forEach(btn => btn.addEventListener('click', this.onRegion));
      }

    onRegion(e){
        const region = e.target.getAttribute('data-region');
        console.log(region)

    }
    connectedCallback(){
        this.innerHTML ='';
        fetch(this.url)
            .then(response => response.json())
            .then(element=>{
                for (let index = 0; index < 12; index++) {
                    this.innerHTML +=`
                        <div class="card">
                            <img src=${element[index].flags.png} alt="" class="img-fluid">
                            <div class="card-content">
                                <a href="javascript:void(0)" data-region="${element[index].region}" class="open-modal"><h3>${element[index].name.common}</h3></a>
                                <p><b>Capital: </b> ${element[index].capital}</p>
                                <p><b>Población: </b>${element[index].population}</p>
                            </div>
                        </div>`  
                }
            })
        this.addButtonListeners();
    }
}

customElements.define('app-pais',Pais);
