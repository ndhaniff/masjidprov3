<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Qariah;
use App\Models\QariahRelative;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RelativesController extends Controller
{
    public function add(Request $request, $id)
    {
        return Inertia::render('Qariah/Relatives/Add', ['parentId' => $id]);
    }

    public function index(Request $request, $qariahId)
    {
        $relatives = QariahRelative::whereQariahId($qariahId)->orderBy('created_at', 'desc')->paginate(10);
        $qariah = Qariah::find($qariahId);

        return Inertia::render('Qariah/Relatives/Relatives', ['id' => $qariahId, 'relatives' => $relatives, 'qariah' => $qariah]);
    }

    public function show(Request $request, $id)
    {
        $relative = QariahRelative::find($id);
        $parentId = $relative->qariah_id;
        $panelMode = 'view';
        return Inertia::render('Qariah/Relatives/Add', compact('parentId', 'relative', 'panelMode'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'new_ic' => 'required|/^\d{6}\-\d{2}\-\d{4}$/',
            'full_name' => 'required|string',
            'sex' => 'required|string',
            'dob' => 'required|date',
        ]);

        $data = $request->only([
            "old_ic",
            "new_ic",
            "full_name",
            "sex",
            "dob",
            "age",
            "physical",
            "relationship",
            "education",
            "occupation",
            "income",
        ]);
        $qariah = Qariah::find($request->qariahId) ?? abort(404, 'not_found');
        $qariah->relatives()->create($data);

        return redirect()->route('qariah.relatives', ['qariahId' => $request->qariahId])->with(['id' => $request->qariahId, 'relatives' => $qariah->relatives, 'qariah' => $qariah]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->only([
            "old_ic",
            "new_ic",
            "full_name",
            "sex",
            "dob",
            "age",
            "physical",
            "relationship",
            "education",
            "occupation",
            "income",
        ]);

        $relative = QariahRelative::find($id) ?? abort(404, 'not_found');
        $relative->update($data);
        $relative->save();
        $qariah = Qariah::find($request->qariahId) ?? abort(404, 'not_found');

        return redirect()->route('qariah.relatives', ['qariahId' => $request->qariahId])->with(['id' => $request->qariahId, 'relatives' => $qariah->relatives, 'qariah' => $qariah]);
    }

    public function destroy(Request $request, $id)
    {
        $relative = QariahRelative::find($id) ?? abort(404, 'not_found');
        $qariahId = $relative->qariah_id;
        $qariah = $relative->qariah;
        $relative->delete();

        $relatives = QariahRelative::whereQariahId($qariahId)->orderBy('created_at', 'desc')->paginate(10);

        return redirect()->route('qariah.relatives', ['qariahId' => $qariah->id])->with(compact('relatives', 'qariah'));
    }
}
