let allButtons = document.querySelectorAll('.like-btn');

async function likeButton(btn , prodId){
    try{
        let response = await axios({
            method: 'post', 
            url: `/products/${prodId}/like`,
            headers : {'X-Requested-With' : 'XMLHttpRequest'}
        })

        console.log('response : ' , response );
    
        if(btn.children[0].classList.contains('fa-regular')){
        
            btn.children[0].classList.remove('fa-regular')
            btn.children[0].classList.add('fa-solid')
        }else{
        
            btn.children[0].classList.remove('fa-solid')
            btn.children[0].classList.add('fa-regular')
        }
    }
    catch(e){
        window.location.replace('/login');
    }
}



for(let btn of allButtons){
    btn.addEventListener('click' , ()=>{
        let prodId = btn.getAttribute('product-id');
        likeButton(btn , prodId);
    })
}