var routedata = { "code": 0,
  "data":
    [
      {
        'path': '/menu1',
        'name': 'menu1',
        'label': '菜单1'
      },
      {
        'path': '/menu2',
        'name': 'menu2',
        'label': '菜单2',
        'children': [
          {
            'path': '/menu2/submenu1',
            'label': '子菜单1',
            'name': 'submenu1'
          },
          {
            'path': '/menu2/submenu2',
            'label': '子菜单2',
            'name': 'submenu2'
          }
        ]
      },
      {
        'path': '/menu3',
        'name': 'menu3',
        'label': '菜单3'
      }
    ]
}

module.exports = routedata
