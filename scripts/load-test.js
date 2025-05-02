import autocannon from 'autocannon'

const runLoadTest = async () => {
  const result = await autocannon({
    url: 'http://localhost:3000',
    connections: 100, // nombre de connexions simultanées
    duration: 30, // durée du test en secondes
    requests: [
      {
        method: 'GET',
        path: '/',
      },
      {
        method: 'GET',
        path: '/projects',
      },
      {
        method: 'GET',
        path: '/contact',
      },
    ],
  })

  console.log(result)
}

runLoadTest()
