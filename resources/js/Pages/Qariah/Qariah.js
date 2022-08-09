import React, { useState } from 'react'
import Admin from '../../Layouts/Admin'
import { Icon, Label, Menu, Table, Button, Dropdown } from 'semantic-ui-react'
import { Link, usePage } from '@inertiajs/inertia-react'
import classNames from 'classnames'
import { Inertia } from '@inertiajs/inertia'
import Swal from 'sweetalert2'
import { _i } from '../../utils'

const options = [
  { key: 'edit', icon: 'edit', text: 'Edit', value: 'edit' },
  { key: 'delete', icon: 'delete', text: 'Padam', value: 'delete' },
]

function Qariah() {
  const { qariahs } = usePage().props

  const selectAction = (action, id) => {
    console.log(action)
    switch (action) {
      case 'delete':
        Swal.fire({
          icon: 'warning',
          text: 'Adakah anda yakin',
          showCancelButton: true,
          customClass: {
            confirmButton: '!bg-red-600'
          }
        }).then((result) => {
          if (result.value) {
            Inertia.delete('/qariah/delete/' + id)
          }
        })
        break
      default:
        Inertia.visit('/qariah/' + id, { method: 'get', data: { panelMode: 'edit' } })
    }
  }

  return (

    <div className="h-full w-full">
      <div className="relative">
        <h1 className='mb-1'>Senarai Ahli Qariah</h1>
        <p>Penduduk Qariah Cheruk Tokun Bawah</p>

        <Button className='absolute top-5 right-5' primary onClick={() => Inertia.visit('/qariah/add', { 'method': 'get' })}>
          <div className="flex items-center">
            <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" /></svg>
            Tambah
          </div>
        </Button>
      </div>
      <div className="p-5 bg-white rounded-md shadow h-[100vh] overflow-y-scroll">
        {qariahs.data.length ? <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>No K/P</Table.HeaderCell>
              <Table.HeaderCell>Tel</Table.HeaderCell>
              <Table.HeaderCell>Jantina</Table.HeaderCell>
              <Table.HeaderCell width={2}>Jumlah Tanggungan</Table.HeaderCell>
              <Table.HeaderCell width={1}>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {qariahs.data.length && qariahs.data.map((qariah, index) => (
              <Table.Row key={'qariah-' + index}>
                <Table.Cell>{qariah.name}</Table.Cell>
                <Table.Cell>{qariah.address}</Table.Cell>
                <Table.Cell>{qariah.new_ic}</Table.Cell>
                <Table.Cell>{qariah.tel}</Table.Cell>
                <Table.Cell>{_i('sex', qariah.sex)}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center">
                    <svg htmltitle="Lihat Tanggungan" className='mr-4 hover:cursor-pointer' onClick={() => Inertia.visit('/qariah/relatives/list/' + qariah.id, { 'method': 'get' })} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" /></svg>
                    <div>
                      {qariah.relative_count} Orang
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Button.Group basic compact>
                    <Button onClick={e => { e.preventDefault(); selectAction('view', qariah.id) }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" /></svg>
                    </Button>
                    <Button onClick={e => { e.preventDefault(); selectAction('delete', qariah.id) }}>
                      <svg className='text-red-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" /></svg>
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row className='bg-gray-50'>
              <Table.Cell colSpan='7'>
                <div className="flex items-center justify-between">
                  <div>Jumlah Keseluruhan: <b>{qariahs.total} Orang</b></div>
                  <Menu floated='right' pagination>
                    <Menu.Item icon>
                      <Link href={qariahs.prev_page_url}><Icon name='chevron left' /></Link>
                    </Menu.Item>
                    {qariahs.links.map((link, index) => index !== 0 && index !== (qariahs.links.length - 1) &&
                      <Link key={'paginate-' + index} className={classNames({
                        'item': true,
                        '!text-gray-400': !link.active, '!text-sky-600 !font-semibold': link.active
                      })} href={link.url}>{link.label}</Link>)}
                    <Menu.Item icon>
                      <Link href={qariahs.next_page_url}>
                        <Icon name='chevron right' /></Link>
                    </Menu.Item>
                  </Menu>
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table> : <div>Tiada Data</div>}
      </div >
    </div >
  )
}

Qariah.layout = page => <Admin children={page}></Admin>

export default Qariah