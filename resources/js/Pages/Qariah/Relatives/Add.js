import { usePage } from '@inertiajs/inertia-react'
import React, { useState, useEffect } from 'react'
import { Form, Message, Select, Button, Header } from 'semantic-ui-react'
import Admin from '../../../Layouts/Admin'
import Data from '../../../Config/Forms'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { Inertia } from '@inertiajs/inertia'
import Swal from 'sweetalert2'

const errorsMap = {
  "full_name": "Nama",
  "newic": "No K/P",
  "oldic": "No K/P Lama",
  "address": "Alamat",
  "sex": "Jantina",
  "dob": "Tarikh Lahir",
  "nationality": "Kewarganegaraan",
}

function Add() {
  const [mode, setMode] = useState('add')
  const { errors, relative, flash, panelMode, parentId } = usePage().props
  const [old_ic, setOldic] = useState('')
  const [new_ic, setNew_ic] = useState('')
  const [full_name, setFull_name] = useState('')
  const [dob, setDob] = useState(new Date())
  const [sex, setSex] = useState('')
  const [age, setAge] = useState('')
  const [physical, setPhysical] = useState('')
  const [relationship, setRelationship] = useState('')
  const [education, setEducation] = useState('')
  const [occupation, setOccupation] = useState('')
  const [income, setIncome] = useState('')
  const [qariahId, setQariahId] = useState(parentId)

  useEffect(() => {
    if (relative) {
      setMode(panelMode)
      setOldic(relative.old_ic ? relative.old_ic : '')
      setNew_ic(relative.new_ic)
      setFull_name(relative.full_name)
      setDob(new Date(relative.dob))
      setSex(relative.sex)
      setAge(relative.age)
      setPhysical(relative.physical)
      setRelationship(relative.relationship)
      setEducation(relative.education)
      setOccupation(relative.occupation)
      setIncome(relative.income)
      setQariahId(relative.qariah_id)
    }
  }, [relative])

  const getDobValue = (date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
  }

  useEffect(() => {
    if (flash) {
      Swal.fire({
        text: flash,
        toast: true,
        icon: 'success',
        timer: 2000,
        position: 'bottom-right',
        customClass: {
          closeButton: '!bg-sky-600',
          cancelButton: '!bg-sky-600',
          confirmButton: '!bg-sky-600',
        },
      }).then(() => Inertia.visit('/qariah/relatives', { method: 'get' }))
    }
  }, [flash]);

  useEffect(() => {
    if (Object.keys(errors).length) {
      let errorsHTML = '';

      Object.keys(errors).map((key, i) => {
        let errorKey = Object.keys(errors)[i];
        errorsHTML += "<li style=\"list-style:none; color:red\" > " + Object.values(errors)[i].replace(errorKey, errorsMap[errorKey]) + "</li > "
      })

      Swal.fire({
        text: 'Ralat',
        html: errorsHTML,
        icon: 'error',
        timer: 2000,
        toast: true,
        position: 'bottom-right',
        customClass: {
          closeButton: '!bg-sky-600',
          cancelButton: '!bg-sky-600',
          confirmButton: '!bg-sky-600',
        }
      })
    }
  }, [errors])

  const handleUpdate = (e) => {
    e.preventDefault()
    if (relative) {
      Inertia.put('/qariah/relatives/' + relative.id, getData())
    }
  }

  const getData = () => {
    return {
      old_ic,
      new_ic,
      full_name,
      sex,
      dob: getDobValue(dob),
      age,
      physical,
      relationship,
      education,
      occupation,
      income,
      qariahId
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    Inertia.post('/qariah/relatives/create', getData())
  }

  return (
    <div>
      {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
      <h1 className='mb-1'>B: Maklumat Tanggungan</h1>
      <p>Maklumat ahli isi rumah qariah</p>
      {mode == 'view' && <Message
        info
        header='Anda didalam mode baca'
        content="Jika mahu edit sila tekan butang edit"
      />}
      {mode == 'edit' && <Message
        className='!block'
        warning
        header='Hati-hati anda didalam mode edit'
        content="Pastikan setiap data adalah tepat"
      />}
      <Form className="relative z-10">
        <div className='p-10 mb-10 bg-white relative z-[10] rounded-md drop-shadow'>
          <Form.Group>
            <Form.Input label="No K.P Lama" readOnly={mode == 'view'} value={old_ic} onChange={mode == 'view' ? () => { } : (e, { value }) => setOldic(value)} error={errors.hasOwnProperty('old_ic')} width={4}></Form.Input>
            <Form.Input label="No K.P Baru / Surat Beranak" readOnly={mode == 'view'} value={new_ic} onChange={mode == 'view' ? () => { } : (e, { value }) => setNew_ic(value)} error={errors.hasOwnProperty('new_ic')} width={4}></Form.Input>
          </Form.Group>
          <Form.Input error={errors.hasOwnProperty('full_name')} value={full_name} width={10} onChange={mode == 'view' ? () => { } : (e, { value }) => setFull_name(value)} label="Nama Penuh"></Form.Input>

          <div className="grid grid-cols-12 gap-4">
            <div className='field col-span-3 mr-4'>
              <label>Jantina</label>
              <Select onChange={mode == 'view' ? () => { } : (e, { value }) => setSex(value)} value={sex} error={errors.hasOwnProperty('sex')} options={Data['relative']['sex']} />
            </div>
            <div className="col-span-3">
              <Form.Input label="Umur" max="100" type="number" readOnly={mode == 'view'} value={age} onChange={mode == 'view' ? () => { } : (e, { value }) => setAge(value)} error={errors.hasOwnProperty('age')} ></Form.Input>
            </div>
            <div className="col-span-3">
              <SemanticDatepicker value={dob} onChange={mode == 'view' ? () => { } : (e, { value }) => setDob(value)} error={errors.hasOwnProperty('dob')} label="Tarikh Lahir" />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <div className="field">
              <label>Keadaan Fizikal</label>
              <Select value={physical} onChange={mode == 'view' ? () => { } : (e, { value }) => setPhysical(value)} error={errors.hasOwnProperty('physical')} options={Data['relative']['physical']} />
            </div>
            <div className="field">
              <label>Hubungan</label>
              <Select value={relationship} onChange={mode == 'view' ? () => { } : (e, { value }) => setRelationship(value)} error={errors.hasOwnProperty('relationship')} options={Data['relative']['relationship']} />
            </div>
            <div className="field">
              <label>Tahap Pendidikan</label>
              <Select value={education} onChange={mode == 'view' ? () => { } : (e, { value }) => setEducation(value)} error={errors.hasOwnProperty('education')} options={Data['relative']['education']} />
            </div>
            <div className="field">
              <Form.Input label="Pekerjaan" readOnly={mode == 'view'} value={occupation} onChange={mode == 'view' ? () => { } : (e, { value }) => setOccupation(value)} error={errors.hasOwnProperty('occupation')} ></Form.Input>
            </div>
            <div className="field">
              <Form.Input label="Pendapatan" type="number" readOnly={mode == 'view'} value={income} onChange={mode == 'view' ? () => { } : (e, { value }) => setIncome(value)} error={errors.hasOwnProperty('income')} ></Form.Input>
            </div>
          </div>
        </div>

        {mode != 'edit' && mode != 'view' && <Button className='fixed top-[12vh] right-[3vw] z-[3000] shadow-lg' type="submit" primary onClick={(e) => { handleSubmit(e) }}>
          <div className="flex items-center">
            <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
              <path fill="none" d="M0 0h24v24H0z" />
              <path fill="currentColor" d="M7 19v-6h10v6h2V7.828L16.172 5H5v14h2zM4 3h13l4 4v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm5 12v4h6v-4H9z" /></svg>
            <span>Simpan</span>
          </div>
        </Button>}

        {mode != 'edit' && mode != 'add' && <div className='fixed top-[12vh] right-[3vw] z-[3000] '>
          <Button type="submit" className='shadow-lg mr-2' basic color="blue" onClick={(e) => { e.preventDefault(); Inertia.visit('/qariah/relatives/list/' + parentId, { method: 'get' }) }}>
            <div className="flex items-center">
              <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" /></svg>
              <span>Kembali ke Senarai Tanggungan</span>
            </div>
          </Button>
          <Button type="submit" className='shadow-lg' primary onClick={(e) => { e.preventDefault(); setMode('edit') }}>
            <div className="flex items-center">
              <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
                <path fill="none" d="M0 0h24v24H0z" />
                <path fill="currentColor" d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" /></svg>
              <span>Edit</span>
            </div>
          </Button>
        </div>}

        {mode != 'view' && mode != 'add' && <Button type="submit" className='fixed top-[12vh] right-[3vw] z-[3000] shadow-lg' primary onClick={(e) => handleUpdate(e)}>
          <div className="flex items-center">
            <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
              <path fill="none" d="M0 0h24v24H0z" />
              <path fill="currentColor" d="M7 19v-6h10v6h2V7.828L16.172 5H5v14h2zM4 3h13l4 4v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm5 12v4h6v-4H9z" /></svg>
            <span>Kemaskini</span>
          </div>
        </Button>}
      </Form>
    </div>
  )
}

Add.layout = page => <Admin children={page}></Admin>
export default Add