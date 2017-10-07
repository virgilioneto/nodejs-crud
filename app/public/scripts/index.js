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
});
