const imageContainer = document.getElementById('image-container')
const loader = document.querySelector('.loader')
let imageLoad = 0
let totalImage = 0
let ready = false
const apiKey = 'sFBRkUpFeJT4Fz036xrmaSc9QuTmI_rb1gqxvoh1mik'
const count = 30
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`
let photosData = []

const imageLoaded = ()=>{
	imageLoad++
	if(imageLoad === totalImage){
		loader.hidden = true
		ready = true
	}
}

const displayData = ()=>{
	imageLoad = 0
	totalImage = photosData.length
	photosData.forEach((photo)=>{
			const item = document.createElement('a')
			item.setAttribute('href',photo.links.html)
			item.setAttribute('target','_blank')
			const image = document.createElement('img')
			image.setAttribute('src',photo.urls.regular)
			// image.setAttribute('title',photo.alt_description)
			item.appendChild(image)
			imageContainer.appendChild(item)
			image.addEventListener('load',imageLoaded)
	})
}

const fetchData = async()=>{
	try{
		const response = await fetch(apiUrl)
		const data = await response.json();
		photosData = data
		displayData()
	}
	catch(err){
		console.log(err)
	}
}

fetchData()


window.addEventListener('scroll',()=>{
	if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
		ready = false
		fetchData()
	}
})