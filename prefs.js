const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const Lang = imports.lang;

const Gettext = imports.gettext.domain("better-osd");
const _ = Gettext.gettext;

const Convenience = Me.imports.convenience;

//-----------------------------------------------

function init() {
  Convenience.initTranslations();
}

//-----------------------------------------------

const MyBuilderScope = GObject.registerClass(
  {
    Implements: [Gtk.BuilderScope],
  },
  class MyBuilderScope extends GObject.Object {
    vfunc_create_closure(builder, handlerName, flags, connectObject) {
      if (flags & Gtk.BuilderClosureFlags.SWAPPED)
        throw new Error('Unsupported template signal flag "swapped"');

      if (typeof this[handlerName] === "undefined")
        throw new Error(`${handlerName} is undefined`);

      builder
        .get_object("transparency")
        .set_active(this._settings.get_boolean("transparency"));

      return this[handlerName].bind(connectObject || this);
    }

    on_horizontal_value_changed(w) {
      this._settings.set_int(w.get_value_as_int());
    }

    on_vertical_value_changed(w) {
      this._settings.set_int(w.get_value_as_int());
    }

    on_size_value_changed(w) {
      this._settings.set_int(w.get_value_as_int());
    }

    on_delay_value_changed(w) {
      this._settings.set_int(w.get_value_as_int());
    }

    on_state_changed(w) {
      this._settings.set_boolean(w.get_active());
    }
  }
);

//-----------------------------------------------

//I guess this is like the "enable" in extension.js : something called each
//time he user try to access the settings' window
function buildPrefsWidget() {
  let builder = new Gtk.Builder();

  builder.set_scope(new MyBuilderScope());
  builder.add_from_file(Me.dir.get_path() + "/prefs.ui");

  return builder.get_object("main_prefs");
}
