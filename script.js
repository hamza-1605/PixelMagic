//  ********************************************************************************
//                      Working of the 'selecting an image' button
//  ********************************************************************************

const imgInput = document.getElementById('imgInput') ;
const picButton = document.getElementById('welcome');
const box = document.getElementById('box') ;

picButton.addEventListener('click' , () => {
    imgInput.click() ;
})




//  ********************************************************************************
//                      Reading the user picture and displaying it
//  ********************************************************************************

const imgDisplay = document.getElementById('imgDisplay'); 

imgInput.addEventListener('change' , (event) => {
    
    const file = event.target.files[0] ;
    
    // console.log(event.target.files) ;
    // console.log(event.target.files[0]) ;
    // console.log(event.target.files[1]) ;
    // console.log(file) ;
    // console.log(file.type) ;

    if( file && file.type.startsWith('image/')){

        const reader = new FileReader() ;

        reader.onload = (e) => {
            
            const img = new Image();
            img.src = e.target.result ;

            img.onload = (e) => {

               if(img.naturalWidth > img.naturalHeight){
                    imgDisplay.style.width = '80vw' ;
                    imgDisplay.style.height = 'auto' ;
                    // console.log('width bigger')
                    // if(window.innerWidth < 450){
                        //     imgDisplay.style.width = '250px' ;
                        // }
                }
                else{
                    imgDisplay.style.height = '70vh' ;
                    imgDisplay.style.width = 'auto' ;
                    if(window.innerWidth < '1000px'){
                        imgDisplay.style.width = '90vw' ;
                        imgDisplay.style.height = 'auto' ;
                    }
                    // console.log('Height bigger')
                }
            }

            imgDisplay.src = e.target.result ;
            imgDisplay.style.display = 'block' ;
            
        }

        reader.readAsDataURL(file) ;
        box.style.display = 'flex' ;
    }
    else{
        alert('Please select an image file.')
    }
    
})





//  ********************************************************************************
//                   Applying the effect with the help of the button
//  ********************************************************************************

const options = document.getElementById('options') ;
const process = document.getElementById('process') ;
const canvas = document.getElementById('myCanvas') ;
const reset = document.getElementById('resetBtn') ;

process.addEventListener('click' , () => {
    const effect = options.value ;
    // console.log(effect);
    
    switch( effect ){
        case 'Grayscale':
            imgDisplay.style.filter = 'grayscale(100%)' ;
            break;
            
        case 'Negative':
            imgDisplay.style.filter = 'invert(100%)' ;
            break;
                
        case 'Blur':
            imgDisplay.style.filter = 'blur(5px)' ;
            break;
                    
        case 'Mirror':
            if(imgDisplay.style.transform === 'scaleX(-1)'){
                imgDisplay.style.transform = 'scaleX(1)'
            }
            else{
                imgDisplay.style.transform = 'scaleX(-1)' ;
            }
            break;
                        
        case 'Invert':
            if(imgDisplay.style.transform === 'scaleY(-1)'){
                imgDisplay.style.transform = 'scaleY(1)'
            }
            else{
                imgDisplay.style.transform = 'scaleY(-1)' ;
            }
            break;
        
        case 'nope':
            process.style.cursor = 'not-allowed' ;
            break;
        }

        if(options.value !== 'nope'){
            dloadBtn.style.display = 'block' ;
            reset.style.display = 'block' ;
        }


        // *****************************************************************
        //               Image drawing on Canvas to download         
        // *****************************************************************

        canvas.width = imgDisplay.naturalWidth ;
        canvas.height = imgDisplay.naturalHeight ;
        
        
        const ctx = canvas.getContext('2d') ;
        
        ctx.filter = getComputedStyle(imgDisplay).filter ;
        ctx.save() ;
        
        if( effect === 'Mirror' ){
            ctx.scale( -1 , 1 ) ;
            ctx.drawImage( imgDisplay, -canvas.width, 0, canvas.width, canvas.height) ;
        } 
        else if( effect === 'Invert' ){
            ctx.scale( 1, -1 )
            ctx.drawImage( imgDisplay, 0, -canvas.height, canvas.width, canvas.height) ;
        } 
        else{
            ctx.drawImage( imgDisplay, 0, 0, canvas.width, canvas.height) ;
        }
        
        ctx.restore() ;
        
})




//  ********************************************************************************
//                          Button to reset the effects 
//  ********************************************************************************

reset.addEventListener('click', () => {
    imgDisplay.style.filter = 'grayscale(0%) invert(0%) blur(0px)' ;
    imgDisplay.style.transform = 'scaleX(1) scaleY(1)' ;
})





//  ********************************************************************************
//                    Functionality of the Download Button
//  ********************************************************************************

const dloadBtn = document.getElementById('downloadBtn');

dloadBtn.addEventListener('click' , () => {
        const link = document.createElement('a') ;
        // console.log(link) ;
        link.download = 'PixelMagicPic.jpeg' ;
        link.href = canvas.toDataURL();
        link.click() ;
})





//  ********************************************************************************
//            Disabling cursor if drop-down list is equal to orginal or null
//  ********************************************************************************

if(options.value === 'nope'){
    process.style.cursor = 'not-allowed' ;
    process.style.opacity = '0.6';
    dloadBtn.style.display = 'none' ;
}
    
options.addEventListener( 'change' , () => {
        process.style.cursor = 'pointer' ;
        process.style.opacity = '1';
        dloadBtn.style.cursor = 'pointer' ;
        dloadBtn.style.opacity = '1';
    }
})
