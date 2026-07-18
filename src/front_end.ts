type HTML_object = HTMLElement | null
const heading :HTML_object= document.querySelector('h1') as HTML_object
const button :HTML_object = document.querySelector('button') as HTML_object
const form = document.getElementById('contact-form') as HTML_object
const input_name = document.getElementById('name') as HTMLInputElement | null
const messageTextarea = document.getElementById('message') as HTMLTextAreaElement | null


button?.addEventListener(
    'click',
    () => {
        fetch('http://localhost:3000/message')
        .then( response => {
                if (!response.ok){
                    throw new Error(`Server Error: ${response.status} ${response.statusText}`)
                }
                return response.json()
            }
        )
        .then( data => {
                if (heading) {
                    heading.textContent = data.message
                }
            }
        )
        .catch(err =>{
                console.log(err)
            }
        )
    }
)


form?.addEventListener(
    'submit', 
    (e) => {
        e.preventDefault();

        const name = input_name?.value ?? ''
        const message = messageTextarea?.value ?? ''

        fetch('http://localhost:3000/message',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, message})
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response from server:',data)
        })

    }
)