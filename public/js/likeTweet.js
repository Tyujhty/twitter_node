window.addEventListener('DOMContentLoaded', () => {
    likeTweets()
})

function likeTweets() {
    const allHearts = document.querySelectorAll('.fa-heart')
    const tweetsContainer = document.querySelector('.tweets-list-container')

    allHearts.forEach(heart => {
        heart.addEventListener('click', (event)=> {
            const tweetId = event.target.getAttribute('tweetid')
            const isAuthenticated = event.target.getAttribute('authenticated')
            
            if (isAuthenticated === 'yes') {
                axios.get(`/tweet/like/${tweetId}`)
                .then(response => {
                    console.log(response.data)
                    tweetsContainer.innerHTML =''
                    tweetsContainer.innerHTML = response.data
                    likeTweets()
                })
            } else {
                location.assign('/auth/signin/form')
            }

        })
    })
}