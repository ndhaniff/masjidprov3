import { usePage } from '@inertiajs/inertia-react'
import classNames from 'classnames'
import React from 'react'
import Admin from '../Layouts/Admin'

function Dashboard() {
  const { qariahThisYear, qariahTotal, qariahPrevTotal } = usePage().props

  return (
    <>
      <h1 className='mb-1'>Utama</h1>
      <p>Berikut adalah statistik semasa sistem</p>
      <div className="rounded-lg">
        <div className="grid grid-cols-4 gap-10">
          <div className="bg-white  rounded-md p-4 shadow-md">
            <h2 className='mb-1'>Jumlah Qariah</h2>
            <p>Keseluruhan</p>
            <span className="text-6xl text-sky-600">{qariahTotal}</span>
          </div>
          <div className="bg-white rounded-md p-4 shadow-md">
            <h2 className='mb-1'>Jumlah Qariah</h2>
            <p>Pada Tahun {new Date().getFullYear()}</p>
            <span className={classNames({ 'text-6xl': true, 'text-red-500': qariahPrevTotal > qariahThisYear, 'text-green-400': qariahPrevTotal < qariahThisYear })} >{qariahThisYear}</span>
          </div>
          <div className="bg-white rounded-md p-4 shadow-md">
            <h2 className='mb-1'>Jumlah Qariah</h2>
            <p>Pada Tahun Sebelumnya</p>
            <span className="text-6xl">{qariahPrevTotal}</span>
          </div>
        </div>
      </div >
    </>
  )
}

Dashboard.layout = page => <Admin children={page}></Admin>

export default Dashboard