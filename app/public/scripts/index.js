$(document).ready(() => {
  $('#products').DataTable({
    ajax: {
      url: '/product',
      dataSrc: '',
    },
    columns: [
      { data: 'name' },
      { data: 'description' },
    ],
  });

  $('#categories').DataTable({
    ajax: {
      url: '/category',
      dataSrc: '',
    },
    columns: [
      { data: 'name' },
    ],
  });

  $('#productModal').on('shown.bs.modal', () => {
    $.ajax({ url: '/category',
      success(results) {
        results.forEach((result) => {
          $('#categoriesMultipleSelect')
            .append($('<option></option>')
              .attr('value', result.id)
              .text(result.name));
        });
      } });
  });

  $('#productModal').on('hidden.bs.modal', () => {
    $('#categoriesMultipleSelect').html('');
    $('#products').DataTable().ajax.reload();
  });

  $('#productForm').submit((event) => {
    const selectedCategories = [];
    $('#categoriesMultipleSelect :selected').each(function () {
      selectedCategories.push($(this).val());
    });
    const formData = {
      name: $('input[name=productName]').val(),
      description: $('textarea[name=productDescription]').val(),
      categories: selectedCategories.join(','),
    };
    $.ajax({
      type: 'POST',
      url: '/product',
      data: formData,
      dataType: 'json',
      encode: true,
    });
    event.preventDefault();
  });

  $('#categoryModal').on('hidden.bs.modal', () => {
    $('#categoriesMultipleSelect').html('');
    $('#categories').DataTable().ajax.reload();
  });

  $('#categoryForm').submit((event) => {
    const formData = {
      name: $('input[name=categoryName]').val(),
    };
    $.ajax({
      type: 'POST',
      url: '/category',
      data: formData,
      dataType: 'json',
      encode: true,
      success(data, textStatus, jqXHR) {
        $('#categoryModal').modal('toggle');
      },
      error(jqXHR, textStatus, errorThrown) {
      },
    });
    event.preventDefault();
  });
});
