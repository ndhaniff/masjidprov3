<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Qariah;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QariahController extends Controller
{
    public function index()
    {
        $qariahs = Qariah::orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Qariah/Qariah', compact('qariahs'));
    }

    public function show(Request $request, $id)
    {
        $qariah = Qariah::find($id) ?? abort(404, 'Tak jumpa');
        $qariah = $this->casts($qariah);
        $panelMode = 'view';
        return Inertia::render('Qariah/Add', compact('qariah', 'panelMode'));
    }

    public function update(Request $request, $id)
    {
        $dataToUpdate = $this->mapData($request->only([
            'general',
            'marital',
            'health',
            'education',
            'occupation',
            'properties',
            'utilities',
            'others'
        ]));

        $qariah = Qariah::find($id) ?? abort(404, 'not_found');
        $qariah->update($dataToUpdate);
        $qariah->save();

        $qariah = $this->casts($qariah);
        $panelMode = 'view';
        $flash = 'Berjaya dikemaskini';
        return Inertia::render('Qariah/Add', compact('qariah', 'panelMode', 'flash'));
    }

    public function casts($qariah)
    {
        $qariah->education = json_decode($qariah->education, true);
        $qariah->marital = json_decode($qariah->marital, true);
        $qariah->health = json_decode($qariah->health, true);
        $qariah->occupation = json_decode($qariah->occupation, true);
        $qariah->home_ownership = json_decode($qariah->home_ownership, true);
        $qariah->others = json_decode($qariah->others, true);

        return $qariah;
    }

    public function store(Request $request)
    {
        $request->validate([
            'general' => 'required|array',
            'general.newic' => 'required|numeric',
            'general.name' => 'required|string',
            'general.address' => 'required|string',
            'general.sex' => 'required|numeric',
            'general.dob' => 'required|date',
            'general.nationality' => 'required|numeric',
        ]);

        $dataToInsert = $this->mapData($request->only([
            'general',
            'marital',
            'health',
            'education',
            'occupation',
            'properties',
            'utilities',
            'others'
        ]));

        Qariah::create($dataToInsert);

        $qariahs = Qariah::paginate(10);
        return redirect()->route('qariah', compact('qariahs'));
    }

    public function mapData($data)
    {
        return [
            'old_ic' => $data['general']['oldic'],
            'new_ic' => $data['general']['newic'],
            'name' => $data['general']['name'],
            'address' => $data['general']['address'],
            'tel' => $data['general']['tel'],
            'home_tel' => $data['general']['hometel'],
            'office_tel' => $data['general']['officetel'],
            'dob' => Carbon::parse($data['general']['dob'])->format('Y-m-d'),
            'sex' => $data['general']['sex'],
            'nationality' => $data['general']['nationality'],
            'population' => $data['general']['population'],
            'ethnic' => $data['general']['ethnic'],
            'marital' => json_encode([
                'level' => $data['marital']['maritalStatus'],
                'wife_count' => $data['marital']['wifeCount'],
                'child_count' => $data['marital']['childCount'],
                'dependance_count' => $data['marital']['dependantCount'],
            ], true, JSON_UNESCAPED_SLASHES),
            'health' => json_encode([
                'physical' => $data['health']['healthStatus'],
                'disability_type' => $data['health']['disabilityType'],
                'other_disability_type' => $data['health']['otherDisabilityType'],
                'diseases_type' => $data['health']['diseasesType'],
                'other_diseases_type' => $data['health']['otherDiseasesType'],
            ], true, JSON_UNESCAPED_SLASHES),
            'education' => json_encode([
                'level' => $data['education']['educationLevel'],
                'certificate' => $data['education']['certType'],
                'major' => $data['education']['educationMajor'],
                'place_of_study' => $data['education']['educationalInstitution'],
            ], true, JSON_UNESCAPED_SLASHES),
            'home_ownership' => json_encode([
                'water_supply' => $data['utilities']['waterUtil'],
                'electric_supply' => $data['utilities']['elecUtil'],
                'other_supply' => $data['utilities']['otherUtil'],
                'structure' => $data['properties']['buildingStructure'],
                'level' => $data['properties']['ownedLevel'],
                'land_status' => $data['properties']['landStatus'],
                'other_owned_level' => $data['properties']['otherOwnedLevel']
            ], true, JSON_UNESCAPED_SLASHES),
            'occupation' => json_encode([
                'income' => $data['occupation']['income'],
                'sector' => $data['occupation']['workSector'],
                'status' => $data['occupation']['employed'],
                'occupation' => $data['occupation']['occupation'],
                'title' => $data['occupation']['workTitle'],
                'business_occupation' => $data['occupation']['typeOfBusiness'],
                'previous_sector' => $data['occupation']['previousSector'],
                'employees_name_and_address' => $data['occupation']['nameAndPlaceOfWork'],
                'sideincome' => $data['occupation']['sideIncome'],
                'other_sideincome' => $data['occupation']['otherSideIncome']
            ], true, JSON_UNESCAPED_SLASHES),
            'others' => json_encode([
                'vehicle' => $data['others']['vehicle'],
                'help_type' => $data['others']['typeOfHelp'],
                'is_helped' => $data['others']['isHelped'],
                'livestock' => $data['others']['livestockType'],
                'investment_type' => $data['others']['typeOfInvestment'],
                'other_help_type' => $data['others']['otherHelp'],
                'other_investment_type' => $data['others']['otherTypeOfInvestment'],
            ], true, JSON_UNESCAPED_SLASHES),
        ];
    }

    public function add()
    {
        return Inertia::render('Qariah/Add', ['panelMode' => 'add']);
    }

    public function destroy(Request $request, $id)
    {
        $qariah = Qariah::find($id) ?? abort(404, 'not_found');
        $qariah->delete();

        $qariahs = Qariah::paginate(10);

        return redirect()->route('qariah', compact('qariahs'));
    }
}
