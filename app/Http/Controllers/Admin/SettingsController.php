<?php

namespace App\Http\Controllers\Admin;

use App\Setting;
use App\Http\Controllers\Controller;

class SettingsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
        parent::__construct();
    }

    /**
     *
     * @return \Illuminate\Http\Response
     */
    public function index(\Illuminate\Http\Request $request)
    {
        return view('admin/settings/index', [
            'settings' => Setting::orderBy('key', 'asc')->get(),
        ]);
    }

    public function edit(\Illuminate\Http\Request $request)
    {

        // Get credential id to edit
        $settingId = $request->route('id') ?? null;

        $setting = is_null($settingId) ? [] : Setting::where(['id' => $settingId])->firstOrFail();

        // Update setting data
        if ($request->isMethod('post')) {
            // New recored validation rulles
            if (is_null($settingId)) {
                $request->validate([
                    'key' => 'required|max:255|unique:settings',
                    'value' => 'nullable|max:255',
                ]);
                $setting = new Setting($request->all());
                $setting->save();
                $message = 'Setting added.';
            } // Existing record update
            else {
                $request->validate([
                    'key' => 'required|max:255|unique:settings,key,' . $setting->id,
                    'value' => 'nullable|max:255',
                ]);
                $setting->update($request->all());
                $message = 'Setting updated.';
            }

            return redirect()
                ->route('admin_settings_edit', ['id' => $setting->id])
                ->with('status', $message);
        }

        return view('admin/settings/edit', [
            'setting' => $setting,
        ]);
    }

}
