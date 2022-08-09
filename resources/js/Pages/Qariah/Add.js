import React, { useEffect, useState } from 'react'
import { Form, Select, Label, Checkbox, Button, Message } from 'semantic-ui-react';
import Admin from './../../Layouts/Admin';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import Data from '../../Config/Forms'
import classNames from 'classnames';
import { usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2'

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { TextField } from '@mui/material';
import { format } from 'date-fns'

const errorsMap = {
  "general.name": "Nama",
  "general.newic": "No K/P",
  "general.oldic": "No K/P Lama",
  "general.address": "Alamat",
  "general.sex": "Jantina",
  "general.dob": "Tarikh Lahir",
  "general.nationality": "Kewarganegaraan",
}

function Add() {
  const { errors, qariah, panelMode, flash } = usePage().props
  const [mode, setMode] = useState('add')
  // General
  const [oldic, setOldic] = useState('')
  const [newic, setNewic] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [tel, setTel] = useState('+60')
  const [hometel, setHometel] = useState('')
  const [officetel, setOfficetel] = useState('')
  const [dob, setDob] = useState(new Date())
  const [sex, setSex] = useState('')
  const [nationality, setNationality] = useState('')
  const [population, setPopulation] = useState('')
  const [ethnic, setEthnic] = useState('')
  // Marital
  const [maritalStatus, setMaritalStatus] = useState('')
  const [wifeCount, setWifeCount] = useState(0)
  const [childCount, setChildCount] = useState(0)
  const [dependantCount, setDependantCount] = useState(0)
  // Health
  const [healthStatus, setHealthStatus] = useState('')
  const [disabilityType, setDisabilityType] = useState('')
  const [otherDisabilityType, setOtherDisabilityType] = useState('')
  const [diseasesType, setDiseasesType] = useState('')
  const [otherDiseasesType, setOtherDiseasesType] = useState('')
  // Education
  const [educationLevel, setEducationLevel] = useState('')
  const [certType, setCertType] = useState('')
  const [educationalInstitution, setEducationalInstitution] = useState('')
  const [educationMajor, setEducationMajor] = useState('')
  // Occupation
  const [employed, setemployed] = useState('employed')
  const [occupation, setOccupation] = useState('')
  const [workSector, setWorkSector] = useState('')
  const [workTitle, setWorkTitle] = useState('')
  const [nameAndPlaceOfWork, setNameAndPlaceOfWork] = useState('')
  const [typeOfBusiness, setTypeOfBusiness] = useState('')
  const [previousSector, setPreviousSector] = useState('')
  const [income, setIncome] = useState('')
  const [sideIncome, setSideIncome] = useState('')
  const [otherSideIncome, setOtherSideIncome] = useState('')
  // Properties
  const [buildingStructure, setBuildingStructure] = useState('')
  const [ownedLevel, setOwnedLevel] = useState('')
  const [otherOwnedLevel, setOtherOwnedLevel] = useState('')
  const [landStatus, setLandStatus] = useState('')
  // Utilities
  const [waterUtil, setWaterUtil] = useState('')
  const [elecUtil, setElecUtil] = useState('')
  const [otherUtil, setOtherUtil] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
  })
  // Others
  const [vehicle, setVehicle] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  })
  const [noVehicle, setNoVehicle] = useState(0);
  const [typeOfInvestment, setTypeOfInvestment] = useState('')
  const [otherTypeOfInvestment, setOtherTypeOfInvestment] = useState('')
  const [livestockType, setLivestockType] = useState('')
  const [help, setHelp] = useState('')
  const [isHelped, setIsHelped] = useState("false")
  const [typeOfHelp, setTypeOfHelp] = useState('')
  const [otherHelp, setOtherHelp] = useState('')

  useEffect(() => {
    if (qariah) {
      setMode(panelMode)
      setOldic(qariah.old_ic ? qariah.old_ic : '')
      setNewic(qariah.new_ic ? qariah.new_ic : '')
      setName(qariah.name ? qariah.name : '')
      setAddress(qariah.address ? qariah.address : '')
      setTel(qariah.tel ? qariah.tel : '')
      setHometel(qariah.home_tel ? qariah.home_tel : '')
      setOfficetel(qariah.office_tel ? qariah.office_tel : '')
      setDob(qariah.dob ? new Date(qariah.dob) : '')
      setSex(qariah.sex ? qariah.sex : '')
      setNationality(qariah.nationality ? qariah.nationality : '')
      setPopulation(qariah.population ? qariah.population : '')
      setEthnic(qariah.ethnic ? qariah.ethnic : '')
      setMaritalStatus(qariah.marital.level ? qariah.marital.level : '')
      setWifeCount(qariah.marital.wife_count ? qariah.marital.wife_count : '')
      setChildCount(qariah.marital.child_count ? qariah.marital.child_count : '')
      setDependantCount(qariah.marital.dependance_count ? qariah.marital.dependance_count : '')
      setHealthStatus(qariah.health.physical ? qariah.health.physical : '')
      setDisabilityType(qariah.health.disability_type ? qariah.health.disability_type : '')
      setOtherDisabilityType(qariah.health.other_disability_type ? qariah.health.other_disability_type : '')
      setDiseasesType(qariah.health.diseases_type ? qariah.health.diseases_type : '')
      setOtherDiseasesType(qariah.health.other_diseases_type ? qariah.health.other_diseases_type : '')
      setEducationLevel(qariah.education.level ? qariah.education.level : '')
      setCertType(qariah.education.certificate ? qariah.education.certificate : '')
      setEducationalInstitution(qariah.education.place_of_study ? qariah.education.place_of_study : '')
      setEducationMajor(qariah.education.major ? qariah.education.major : '')
      setOccupation(qariah.occupation.occupation ? qariah.occupation.occupation : '')
      setWorkSector(qariah.occupation.sector ? qariah.occupation.sector : '')
      setWorkTitle(qariah.occupation.title ? qariah.occupation.title : '')
      setNameAndPlaceOfWork(qariah.occupation.employees_name_and_address ? qariah.occupation.employees_name_and_address : '')
      setTypeOfBusiness(qariah.occupation.business_occupation ? qariah.occupation.business_occupation : '')
      setPreviousSector(qariah.occupation.previous_sector ? qariah.occupation.previous_sector : '')
      setIncome(qariah.occupation.income ? qariah.occupation.income : '')
      setSideIncome(qariah.occupation.sideincome ? qariah.occupation.sideincome : '')
      setOtherSideIncome(qariah.occupation.other_sideincome ? qariah.occupation.other_sideincome : '')
      setBuildingStructure(qariah.home_ownership.structure ? qariah.home_ownership.structure : '')
      setOwnedLevel(qariah.home_ownership.level ? qariah.home_ownership.level : '')
      setOtherOwnedLevel(qariah.home_ownership.other_owned_level ? qariah.home_ownership.other_owned_level : '')
      setLandStatus(qariah.home_ownership.land_status ? qariah.home_ownership.land_status : '')
      setWaterUtil(qariah.home_ownership.water_supply ? qariah.home_ownership.water_supply : '')
      setElecUtil(qariah.home_ownership.electric_supply ? qariah.home_ownership.electric_supply : '')
      setOtherUtil(qariah.home_ownership.other_supply ? qariah.home_ownership.other_supply : '')
      setVehicle(qariah.others.vehicle ? qariah.others.vehicle : '')
      setNoVehicle(qariah.others.no_vehicle ? qariah.others.no_vehicle : '')
      setTypeOfInvestment(qariah.others.investment_type ? qariah.others.investment_type : '')
      setOtherTypeOfInvestment(qariah.others.other_investment_type ? qariah.others.other_investment_type : '')
      setLivestockType(qariah.others.livestock ? qariah.others.livestock : '')
      setHelp(qariah.others.help_type ? qariah.others.help_type : '')
      setIsHelped(qariah.others.is_helped ? qariah.others.is_helped : '')
      setTypeOfHelp(qariah.others.help_type ? qariah.others.help_type : '')
      setOtherHelp(qariah.others.other_help_type ? qariah.others.other_help_type : '')
    }
  }, [qariah])

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
      }).then(() => Inertia.visit('/qariah', { method: 'get' }))
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

  const getDobValue = (date) => {
    return format(date, 'yyyy-MM-dd')
  }

  const getData = () => {
    return {
      general: {
        oldic,
        newic,
        name,
        address,
        tel,
        hometel,
        officetel,
        dob: getDobValue(dob),
        sex,
        nationality,
        population,
        ethnic,
      },
      marital: {
        maritalStatus,
        wifeCount,
        childCount,
        dependantCount,
      },
      health: {
        healthStatus,
        disabilityType,
        otherDisabilityType,
        diseasesType,
        otherDiseasesType,
      },
      education: {
        educationLevel,
        certType,
        educationalInstitution,
        educationMajor,
      },
      occupation: {
        employed,
        occupation,
        workSector,
        workTitle,
        nameAndPlaceOfWork,
        typeOfBusiness,
        previousSector,
        income,
        sideIncome,
        otherSideIncome,
      },
      properties: {
        buildingStructure,
        ownedLevel,
        otherOwnedLevel,
        landStatus,
      },
      utilities: {
        waterUtil,
        elecUtil,
        otherUtil,
      },
      others: {
        vehicle,
        noVehicle,
        typeOfInvestment,
        livestockType,
        help,
        isHelped,
        typeOfHelp,
        otherHelp,
        otherTypeOfInvestment
      }
    }
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    console.log(qariah)
    if (qariah) {
      Inertia.put('/qariah/' + qariah.id, getData())
    }
  }

  const handleSubmit = (e) => {
    console.log(getData());
    e.preventDefault()
    Inertia.post('/qariah/create', getData())
  }

  const validateNumberOnly = (e) => {
    let theEvent = e || window.event;
    let key;

    // Handle paste
    if (theEvent.type === "paste") {
      key = window.event.clipboardData.getData("text/plain");
    } else {
      // Handle key press
      key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  };

  const handleIcChange = (e) => {
    let value = e.target.value;
    if (value.length == 6 || value.length == 9) {
      setNewic(value + "-");
    } else {
      setNewic(value);
    }
  };

  return (
    <Form className="relative z-10">
      {/* 
########################################
              GENERAL
########################################
*/}
      <div className="">
        <h1 className='mb-1'>A: Maklumat Qariah</h1>
        <p>Maklumat ketua keluarga</p>
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
        <div className="p-10 mb-10 bg-white relative z-[17] rounded-md drop-shadow">
          <h3 className="mb-4">Maklumat Asas</h3>
          <Form.Group>
            <Form.Input readOnly={mode == 'view'} value={oldic} error={errors.hasOwnProperty('general.oldic')} onChange={mode == 'view' ? () => { } : (e, { value }) => setOldic(value)} label='No K/P Lama' width={4} />
            <Form.Input maxLength={14} readOnly={mode == 'view'} value={newic} error={errors.hasOwnProperty('general.newic')} onChange={mode == 'view' ? () => { } : (e) => handleIcChange(e)} required label='No K/P Baru' width={4} />
          </Form.Group>
          <Form.Input readOnly={mode == 'view'} value={name} onChange={mode == 'view' ? () => { } : (e, { value }) => setName(value.toUpperCase())} error={errors.hasOwnProperty('general.name')} required label="Nama Penuh (Seperti di dalam kad pengenalan.)" />
          <Form.Input readOnly={mode == 'view'} value={address} onChange={mode == 'view' ? () => { } : (e, { value }) => setAddress(value.toUpperCase())} error={errors.hasOwnProperty('general.address')} required label="Alamat" />
          <Form.Group>
            <Form.Input readOnly={mode == 'view'} value={tel} onChange={mode == 'view' ? () => { } : (e, { value }) => setTel(value)} label='No Tel' width={4} />
            <Form.Input readOnly={mode == 'view'} value={hometel} onChange={mode == 'view' ? () => { } : (e, { value }) => setHometel(value)} label='No Tel Rumah' width={4} />
            <Form.Input readOnly={mode == 'view'} value={officetel} onChange={mode == 'view' ? () => { } : (e, { value }) => setOfficetel(value)} label='No Tel Pejabat' width={4} />
          </Form.Group>

          <div className="field wide datepicker three">
            <label>Tarikh Lahir</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                hiddenLabel
                value={dob}
                inputFormat="dd/MM/yyyy"
                onChange={(newValue) => {
                  setDob(newValue)
                }}
                renderInput={(params) => <TextField
                  hiddenLabel {...params} />}
              />
            </LocalizationProvider>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <div className="required field">
              <label>Jantina</label>
              <Select value={sex} onChange={mode == 'view' ? () => { } : (e, { value }) => setSex(value)} error={errors.hasOwnProperty('general.sex')} required placeholder='Pilih Jantina' options={Data['sex']} />
            </div>
            <div className="required field">
              <label>Kewarganegaraan</label>
              <Select value={nationality} onChange={mode == 'view' ? () => { } : (e, { value }) => setNationality(value)} error={errors.hasOwnProperty('general.nationality')} placeholder='Pilih Kewarganegaraan' options={Data['nationality']} />
            </div>
            <div className=" field">
              <label>Status Kependudukan</label>
              <Select value={population} onChange={mode == 'view' ? () => { } : (e, { value }) => setPopulation(value)} placeholder='Pilih Kependudukan' options={Data['population']} />
            </div>
            <div className=" field">
              <label>Etnik</label>
              <Select value={ethnic} onChange={mode == 'view' ? () => { } : (e, { value }) => setEthnic(value)} placeholder='Pilih Etnik' options={Data['ethnic']} />
            </div>
          </div>
        </div>

        {/* 
########################################
              MARRITAL
########################################
*/}

        <div className='p-10 mb-10 bg-white relative z-[16] rounded-md drop-shadow'>
          <h3 className="mb-4">Status Perkahwinan</h3>
          <div className="grid grid-cols-5 gap-4">
            <div className="required field">
              <label>Taraf Kahwin</label>
              <Select value={maritalStatus} onChange={mode == 'view' ? () => { } : (e, { value }) => setMaritalStatus(value)} placeholder='Pilih Taraf Kahwin' options={Data['marrital']} />
            </div>
            <div className=" field">
              <label>Bilangan Isteri</label>
              <Select value={wifeCount} onChange={mode == 'view' ? () => { } : (e, { value }) => setWifeCount(value)} placeholder='Pilih Bilangan Isteri' options={Data['wifes']} />
            </div>
            <div className=" field">
              <Form.Input readOnly={mode == 'view'} value={childCount} onChange={mode == 'view' ? () => { } : (e, { value }) => setChildCount(value)} label='Bilangan Anak' type="number" />
            </div>
            <div className=" field">
              <Form.Input readOnly={mode == 'view'} value={dependantCount} onChange={mode == 'view' ? () => { } : (e, { value }) => setDependantCount(value)} label='Bilangan Tangungan' type="number" />
            </div>
          </div>
        </div>

        {/* 
########################################
              HEALTH
########################################
*/}

        <div className='p-10 mb-10 bg-white relative z-[15] rounded-md drop-shadow'>
          <h3 className="mb-4">Status Kesihatan</h3>
          <div className="grid grid-cols-5 gap-4">
            <div className=" field">
              <label>Keadaan Fizikal</label>
              <Select value={healthStatus} onChange={mode == 'view' ? () => { } : (e, { value }) => setHealthStatus(value)} placeholder='Pilih Keadaan Fizikal' options={Data['health']['physical']} />
            </div>
            <div className="field">
              <label>Jenis Kecacatan (Jika Cacat)</label>
              <Select value={disabilityType} onChange={mode == 'view' ? () => { } : (e, { value }) => setDisabilityType(value)} placeholder='Pilih Jenis Kecacatan' options={Data['health']['disablity']} />
            </div>
            <div className="field">
              <Form.Input readOnly={mode == 'view'} value={otherDisabilityType} onChange={mode == 'view' ? () => { } : (e, { value }) => setOtherDisabilityType(value)} label='Lain-lain Jenis Kecacatan (Jika Cacat)' placeholder="Lain-lain Jenis Kecacatan" />
            </div>
            <div className=" field">
              <label>Jenis Penyakit (Jika Sakit)</label>
              <Select value={diseasesType} onChange={mode == 'view' ? () => { } : (e, { value }) => setDiseasesType(value)} placeholder='Pilih Jenis Penyakit' options={Data['health']['diseases']} />
            </div>
            <div className=" field">
              <Form.Input readOnly={mode == 'view'} value={otherDiseasesType} onChange={mode == 'view' ? () => { } : (e, { value }) => setOtherDiseasesType(value)} label='Lain-lain Jenis Penyakit (Jika Sakit)' placeholder="Lain-lain Jenis Kecacatan" />
            </div>
          </div>
        </div>

        <div className='p-10 mb-10 bg-white relative z-[14] rounded-md drop-shadow'>
          <h3 className="mb-4">Status Pendidikan</h3>
          <div className="grid grid-cols-5 gap-4">
            <div className="required field">
              <label>Tahap Pendidikan</label>
              <Select value={educationLevel} onChange={mode == 'view' ? () => { } : (e, { value }) => setEducationLevel(value)} required placeholder='Pilih Tahap Pendidikan' options={Data['education']['level']} />
            </div>
            <div className="field">
              <label>Sijil/Diploma/Ijazah Tertingi</label>
              <Select value={certType} onChange={mode == 'view' ? () => { } : (e, { value }) => setCertType(value)} placeholder='Pilih Jenis Sijil/Diploma/Ijazah' options={Data['education']['cert']} />
            </div>
            <div className="field">
              <label>Institusi Pengajian</label>
              <Select value={educationalInstitution} onChange={mode == 'view' ? () => { } : (e, { value }) => setEducationalInstitution(value)} placeholder='Pilih Institusi Pengajian' options={Data['education']['place']} />
            </div>
            <div className="field">
              <Form.Input readOnly={mode == 'view'} value={educationMajor} onChange={mode == 'view' ? () => { } : (e, { value }) => setEducationMajor(value)} label='Bidang Pengkhususan' placeholder="Nyatakan Bidang Pengkhususan" />
            </div>
          </div>
        </div>

        {/* 
########################################
              OCCUPATION
########################################
*/}

        <div className='p-10 mb-10 bg-white relative z-[13] rounded-md drop-shadow'>
          <h3 className="mb-4">Status Pekerjaan / Pendapatan</h3>
          <div className="grid grid-cols-5 gap-4">
            <div className="required field">
              <label>Bekerja Atau Tidak</label>
              <div className="flex mt-2">
                <Form.Field >
                  <Checkbox
                    className='mr-4'
                    radio
                    label='Bekerja'
                    name='employed'
                    value="employed"
                    checked={employed === 'employed'}
                    onChange={mode == 'view' ? () => { } : (e, { value }) => setemployed(value)}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    className='mr-4'
                    radio
                    label='Tidak Bekerja'
                    name='employed'
                    value="unemployed"
                    checked={employed === 'unemployed'}
                    onChange={mode == 'view' ? () => { } : (e, { value }) => setemployed(value)}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    radio
                    label='Pesara'
                    name='employed'
                    value="retired"
                    checked={employed === 'retired'}
                    onChange={mode == 'view' ? () => { } : (e, data) => setemployed(data.value)}
                  />
                </Form.Field>
              </div>
            </div>
          </div>

          <div className="work">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-8 field">
                <Form.Input readOnly={mode == 'view'} value={occupation} onChange={mode == 'view' ? () => { } : (e, { value }) => setOccupation(value)} disabled={employed != 'employed'} label='Pekerjaan' placeholder="Pekerjaan" />
              </div>

              <div className={classNames({
                'col-span-4 field': true,
                'disabled': employed != 'employed'
              })}>
                <label>Sektor Pekerjaan</label>
                <Select value={workSector} onChange={mode == 'view' ? () => { } : (e, { value }) => setWorkSector(value)} disabled={employed != 'employed'} placeholder='Pilih Sektor Pekerjaan' options={Data['work_sector']} />
              </div>

              <div className="col-span-4 field">
                <div className="field">
                  <Form.Input readOnly={mode == 'view'} value={workTitle} onChange={mode == 'view' ? () => { } : (e, { value }) => setWorkTitle(value)} disabled={employed != 'employed'} label='Jawatan' placeholder="Jawatan" />
                </div>
              </div>

              <div className="col-span-8 field">
                <div className="field">
                  <Form.Input readOnly={mode == 'view'} value={nameAndPlaceOfWork} onChange={mode == 'view' ? () => { } : (e, { value }) => setNameAndPlaceOfWork(value)} disabled={employed != 'employed'} label='Nama & Alamat Majikan' placeholder="Nama & Alamat Majikan" />
                </div>
              </div>
            </div>
          </div>

          <div className="not-work">
            <div className="field">
              <Form.Input readOnly={mode == 'view'} value={typeOfBusiness} onChange={mode == 'view' ? () => { } : (e, { value }) => setTypeOfBusiness(value)} disabled={employed != 'unemployed'} label='Jika Berniaga, Sila Nyatakan jenis perniagaan' placeholder="Jenis Perniagaan" />
            </div>
          </div>

          <div className={classNames({
            'retired field': true,
            'disabled': employed != 'retired'
          })}>
            <label>Jika Pesara, Sila Nyatakan Sektor Pekerjaan Sebelumnya</label>
            <Select value={previousSector} onChange={mode == 'view' ? () => { } : (e, { value }) => setPreviousSector(value)} placeholder='Jika Pesara, Sila nyatakan sektor pekerjaan sebelumnya' options={Data['previous_work_sector']} />
          </div>

          <div className="w-1/2 income field">
            <label>Pendapatan</label>
            <Select value={income} onChange={mode == 'view' ? () => { } : (e, { value }) => setIncome(value)} placeholder='Pendapatan' options={Data['income']} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className=" field">
              <label>Pendapatan Sampingan (Jika Ada)</label>
              <Select value={sideIncome} onChange={mode == 'view' ? () => { } : (e, { value }) => setSideIncome(value)} placeholder='Pendapatan' options={Data['sideincome']} />
            </div>

            <div className="field">
              <Form.Input readOnly={mode == 'view'} value={otherSideIncome} onChange={mode == 'view' ? () => { } : (e, { value }) => setOtherSideIncome(value)} label='Lain-lain Pendapatan Sampingan' placeholder="Jenis Perniagaan" />
            </div>
          </div>
        </div>
      </div >

      {/* 
########################################
              PROPERTIES
########################################
*/}

      <div className='p-10 mb-10 bg-white relative z-[12] rounded-md drop-shadow'>
        <h3>Status Pemilikan Rumah / Tanah</h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="field">
            <label>Struktur Binaan</label>
            <Select value={buildingStructure} onChange={mode == 'view' ? () => { } : (e, { value }) => setBuildingStructure(value)} placeholder='Struktur Binaan' options={Data['properties']['structure']} />
          </div>
          <div className="field">
            <label>Taraf Pemilikan Rumah</label>
            <Select value={ownedLevel} onChange={mode == 'view' ? () => { } : (e, { value }) => setOwnedLevel(value)} placeholder='Taraf Pemilikan Rumah' options={Data['properties']['level']} />
          </div>
          <div className="field">
            <Form.Input readOnly={mode == 'view'} value={otherOwnedLevel} onChange={mode == 'view' ? () => { } : (e, { value }) => setOtherOwnedLevel(value)} label='Lain-lain Taraf Pemilikan Rumah' placeholder="Lain-lain Taraf Pemilikan Rumah" />
          </div>
          <div className="field">
            <label>Status Tanah Yang Diduduki</label>
            <Select value={landStatus} onChange={mode == 'view' ? () => { } : (e, { value }) => setLandStatus(value)} placeholder='Status Tanah' options={Data['properties']['status']} />
          </div>
        </div>
      </div>

      {/* 
########################################
              UTILITIES
########################################
*/}

      <div className='p-10 mb-10 bg-white relative z-[11] rounded-md drop-shadow'>
        <h3>Kemudahan</h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="field">
            <label>Bekalan Air</label>
            <Select value={waterUtil} onChange={mode == 'view' ? () => { } : (e, { value }) => setWaterUtil(value)} placeholder='Bekalan Air' options={Data['utilities']['water']} />
          </div>
          <div className="field">
            <label>Bekalan Elektrik</label>
            <Select value={elecUtil} onChange={mode == 'view' ? () => { } : (e, { value }) => setElecUtil(value)} placeholder='Bekalan Elektrik' options={Data['utilities']['electric']} />
          </div>
          <div className="field col-span-3">
            <label>Lain-lain Kemudahan</label>
            <div className="grid grid-cols-2">
              {Data['utilities']['others'].map((utl, index) => {
                return (
                  <li className="grid grid-cols-2 gap-4 mb-2" key={utl.key}>
                    <Form.Checkbox checked={!!otherUtil[utl.key]} label={utl.text} readOnly={mode == 'view'} onChange={mode == 'view' ? () => { } : (e, { value }) => setOtherUtil(state => ({
                      ...state, [utl.key]: otherUtil[utl.key] == 1 ? 0 : 1
                    }))} />
                  </li>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 
########################################
              OTHERS
########################################
*/}

      <div className='relative z-10 p-10 mb-10 bg-white rounded-md drop-shadow'>
        <h3>Lain-lain</h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="field">
            <div style={{ marginBottom: 0 }} className="grid grid-cols-2 gap-4 field">
              <label>Jenis Kenderaan</label>
              <label>Bilangan</label>
            </div>
            {Data['others']['vehicles'].map((vhc, index) => (
              <li className="grid grid-cols-2 gap-4 mb-2" key={vhc.key}>
                <div>{vhc.text}</div>
                <Form.Input readOnly={mode == 'view'} value={vehicle[vhc.key]} onChange={mode == 'view' ? () => { } : (e, { value }) => setVehicle(state => ({
                  ...state, [vhc.key]: value
                }))} type="number" min="0" />
              </li>
            ))}

            <Form.Checkbox checked={!!noVehicle} label="Tiada Kenderaan" readOnly={mode == 'view'} onChange={mode == 'view' ? () => { } : (e, { value }) => setNoVehicle(noVehicle == 1 ? 0 : 1)} />
          </div>
          <div className="field">
            <label>Jenis Simpanan / Pelaburan</label>
            <Select value={typeOfInvestment} onChange={mode == 'view' ? () => { } : (e, { value }) => setTypeOfInvestment(value)} placeholder='Jenis Simpanan / Pelaburan' options={Data['others']['investment']} />
          </div>
          <div className="field">
            <Form.Input readOnly={mode == 'view'} onChange={mode == 'view' ? () => { } : (e, { value }) => setOtherTypeOfInvestment(value)} label='Lain-lain Simpanan / Pelaburan' placeholder="Lain-lain Simpanan/Pelaburan" />
          </div>

          <div className="required field">
            <label>Pernah menerima Bantuan?</label>
            <div className="flex mt-2">
              <Form.Field >
                <Checkbox
                  className='mr-4'
                  radio
                  label='Ya'
                  name='isHelped'
                  value="true"
                  checked={isHelped === "true"}
                  onChange={mode == 'view' ? () => { } : (e, data) => setIsHelped(data.value)}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  className='mr-4'
                  radio
                  label='Tidak'
                  name='isHelped'
                  value="false"
                  checked={isHelped === "false"}
                  onChange={mode == 'view' ? () => { } : (e, data) => setIsHelped(data.value)}
                />
              </Form.Field>
            </div>
          </div>
          <div className={classNames({ 'field': true, 'disabled': isHelped == 'false' })}>
            <label>Jenis Bantuan</label>
            <Select value={help} onChange={mode == 'view' ? () => { } : (e, { value }) => setHelp(value)} placeholder='Jenis Bantuan' options={Data['others']['help']} />
          </div>

          <div className={classNames({ 'field': true, 'disabled': isHelped == 'false' })}>
            <Form.Input readOnly={mode == 'view'} value={otherHelp} onChange={mode == 'view' ? () => { } : (e, { value }) => setOtherHelp(value)} label='Lain-lain Bantuan Yang Diterima' placeholder="Lain-lain Bantuan Yang Diterima" />
          </div>

          <div className='field'>
            <label>Ternakan</label>
            <Select value={livestockType} onChange={mode == 'view' ? () => { } : (e, { value }) => setLivestockType(value)} placeholder='Jenis Ternakan' options={Data['others']['livestock']} />
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
        <Button basic color="blue" type="submit" className='shadow-lg' onClick={(e) => { e.preventDefault(); Inertia.visit('/qariah/relatives/add/' + qariah.id) }}>
          <div className="flex items-center">
            <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
              <path fill="none" d="M0 0h24v24H0z" />
              <path fill="currentColor" d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" /></svg>
            <span>Tambah Tanggungan</span>
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
    </Form >
  )
}

Add.layout = page => <Admin children={page}></Admin>

export default Add