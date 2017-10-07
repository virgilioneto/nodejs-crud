$(document).ready(() => {
  $('#products').DataTable({
    ajax: {
      url: '/product',
      dataSrc: (products) => {
        const returnData = new Array();
        products.forEach((product) => {
          const categories = new Array();
          product.Categories.forEach((category) => {
            categories.push(category.name);
          });
          returnData.push({
            name: product.name,
            description: product.description,
            categories: categories.join(', '),
            editLink: `<input type="button" value="Edit" onclick="editProduct(${product.id})" />`,
            deleteLink: `<input type="button" value="Delete" onclick="deleteProduct(${product.id})" />`,
          });
        });
        return returnData;
      },
    },
    columns: [
      { data: 'name' },
      { data: 'description' },
      { data: 'categories' },
      { data: 'editLink' },
      { data: 'deleteLink' },
    ],
  });

  $('#categories').DataTable({
    ajax: {
      url: '/category',
      dataSrc: (categories) => {
        const returnData = new Array();
        categories.forEach((category) => {
          returnData.push({
            name: category.name,
            editLink: `<input type="button" value="Edit" onclick="editCategory(${category.id})" />`,
            deleteLink: `<input type="button" value="Delete" onclick="deleteCategory(${category.id})" />`,
          });
        });
        return returnData;
      },
    },
    columns: [
      { data: 'name' },
      { data: 'editLink' },
      { data: 'deleteLink' },
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
      },
    });
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
      id: $('input[name=productId]').val(),
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


const editProduct = function editProduct(id) {
  // $.ajax({ url: `/product/${id}`,
  //   success(result) {
  //     $('#productName').val(result.name);
  //     $('#productDescription').val(result.description);
  //
  //     $.ajax({ url: '/category',
  //       success(loadCategories) {
  //         loadCategories.forEach((category) => {
  //           $('#categoriesMultipleSelect')
  //             .append($('<option></option>')
  //               .attr('value', category.id)
  //               .text(category.name));
  //         });
  //       },
  //     });
  //
  //
  //     const categoryArray = new Array();
  //     result.Categories.forEach((category) => {
  //       categoryArray.push(category.id);
  //     });
  //
  //     $('#categoriesMultipleSelect').val(categoryArray);
  //     $('#categoriesMultipleSelect').multiselect('refresh');
  //   },
  // });
  // $('#productModal').modal('toggle');

  // TODO: Load multiselect
};

const deleteProduct = function deleteProduct(id) {
  $.ajax({
    url: `/product/${id}`,
    type: 'DELETE',
    success() {
      $('#products').DataTable().ajax.reload();
    },
  });
};

const editCategory = function editCategory(id) {

};

const deleteCategory = function deleteCategory(id) {
  $.ajax({
    url: `/category/${id}`,
    type: 'DELETE',
    success() {
      $('#categories').DataTable().ajax.reload();
    },
  });
};
