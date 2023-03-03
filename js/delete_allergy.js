function deleteAllergy(allergy_id) {
  //console.log('delete allergy-clicked!')
    let link = '/delete-allergy';
    let data = {
      id: allergy_id
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(allergy_id);
      }
    });
  }
  
  function deleteRow(allergy_id){
      let table = document.getElementById("allergies-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == allergy_id) {
              table.deleteRow(i);
              break;
         }
      }
  }

