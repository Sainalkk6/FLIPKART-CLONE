
async function fetchContent() {
    try{
        const response = await fetch('./assets/data/content.json')
        const data = await response.json()

        createHeader(data)
    } catch(err){

    }
}





fetchContent()