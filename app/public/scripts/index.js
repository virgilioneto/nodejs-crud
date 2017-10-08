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

  // $('#productModal').on('shown.bs.modal', () => {
  //   $.ajax({ url: '/category',
  //     success(results) {
  //       results.forEach((result) => {
  //         $('#categoriesMultipleSelect')
  //           .append($('<option></option>')
  //             .attr('value', result.id)
  //             .text(result.name));
  //       });
  //     },
  //   });
  // });

  $('#productModal').on('hidden.bs.modal', () => {
    $('#categoriesMultipleSelect').html('');
    $('#products').DataTable().ajax.reload();
  });

  $('#productModal').on('hidden.bs.modal', () => {
    $('#productName').val('');
    $('#productDescription').val('');
    $('#categoriesMultipleSelect').html('');
    $('#products').DataTable().ajax.reload();
  });

  $('#categoryModal').on('hidden.bs.modal', () => {
    $('#categoryName').val('');
    $('#categories').DataTable().ajax.reload();
  });
});

const newProduct = function newProduct() {
  $('#saveProduct').unbind('click');
  $('#saveProduct').click(() => {
    const selectedCategories = [];
    $('#categoriesMultipleSelect :selected').each(function () {
      selectedCategories.push($(this).val());
    });
    const formData = {
      // id: $('input[name=productId]').val(),
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
      success() {
        $('#productModal').modal('toggle');
      },
    });
  });
  $('#categoriesMultipleSelect').html('');
  $.ajax({
    url: '/category',
    success(loadCategories) {
      loadCategories.forEach((category) => {
        $('#categoriesMultipleSelect')
          .append($('<option></option>')
            .attr('value', category.id)
            .text(category.name));
      });
    },
  });
};

const editProduct = function editProduct(id) {
  $('#saveProduct').unbind('click');
  $('#saveProduct').click(() => {
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
      type: 'PUT',
      url: `/product/${id}`,
      data: formData,
      dataType: 'json',
      encode: true,
      success() {
        $('#productModal').modal('toggle');
      },
    });
  });

  $.ajax({
    url: `/product/${id}`,
    success(result) {
      $('#productName').val(result.name);
      $('#productDescription').val(result.description);

      const categoryArray = new Array();
      result.Categories.forEach((category) => {
        categoryArray.push(category.id);
      });

      $('#categoriesMultipleSelect').html('');
      $.ajax({ url: '/category',
        success(loadCategories) {
          loadCategories.forEach((category) => {
            if (categoryArray.indexOf(category.id)) {
              $('#categoriesMultipleSelect')
                .append($('<option></option>')
                  .attr('selected', 'selected')
                  .attr('value', category.id)
                  .text(category.name));
            } else {
              $('#categoriesMultipleSelect')
                .append($('<option></option>')
                  .attr('value', category.id)
                  .text(category.name));
            }
          });
        },
      });
    },
  });

  $('#productModal').modal('toggle');
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

const newCategory = function newCategory() {
  $('#saveCategory').unbind('click');
  $('#saveCategory').click(() => {
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
  });
};

const editCategory = function editCategory(id) {
  $('#saveCategory').unbind('click');
  $('#saveCategory').click(() => {
    const formData = {
      name: $('input[name=categoryName]').val(),
    };
    $.ajax({
      type: 'PUT',
      url: `/category/${id}`,
      data: formData,
      dataType: 'json',
      encode: true,
      success(data, textStatus, jqXHR) {
        $('#categoryModal').modal('toggle');
      },
      error(jqXHR, textStatus, errorThrown) {
      },
    });
  });

  $.ajax({
    url: `/category/${id}`,
    success(result) {
      $('#categoryName').val(result.name);
    },
  });

  $('#categoryModal').modal('toggle');
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
