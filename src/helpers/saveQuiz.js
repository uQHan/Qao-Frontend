export default function saveQuiz(name, description, startTime, endTime) {
   const now = new Date().toISOString();
   const oneHourLater = new Date(Date.now() + 60 * 60 * 1000).toISOString();
   const payload = {
      host_id: "host456",
      title: name,
      description: description,
      categories_id: ["cat001", "cat002"],
      start_time: startTime + ":00Z",
      end_time: endTime + ":00Z",
      created_at: now,
      updated_at: now,
   };
   console.log('Payload:', payload); // Log the payload to be sent to the API
   const save = fetch('/api/save-quiz', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
   }).then(res => res.json())
      .then(data => {
         if (data.statusCode >= 400) {
            const error = new Error(data.message)
            error.statusCode = data.status
            throw error
         } else return data
      })
      .catch(err => {
         console.log(err)
         throw err
      })

   return save
}