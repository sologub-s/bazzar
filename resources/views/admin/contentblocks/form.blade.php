<form method="post" enctype="multipart/form-data" action="{{ $action }}">
    <div class="row">
        <div class="col-12">
            <div class="form-group">
                <label for="control_name">Name</label>
                <input type="name" class="form-control" id="control_name" aria-describedby="control_name_help" placeholder="Enter contentblock name" name='name' value="{{ $contentblock['name'] }}">
                <!--<small id="control_name_help" class="form-text text-muted disabled">Автоматическое поле</small>-->
            </div>

            <div class="form-group">
                <label for="control_slug">Slug</label>
                <input type="text" class="form-control" id="control_slug" aria-describedby="control_slug_help" placeholder="Enter contentblock slug" name='slug' value="{{ $contentblock['slug'] }}">
                <!--<small id="control_name_help" class="form-text text-muted disabled">Автоматическое поле</small>-->
            </div>

            <div class="form-check">
                <label class="form-check-label">
                    <input type="checkbox" class="form-check-input jsBootstrapSwitch" {{ $contentblock['active'] == 1 ? 'checked' : '' }} name="active" data-on-text="Enabled" data-off-text="Disabled" data-on-color="success">
                </label>
            </div>

            <div class="form-group">
                <label for="control_content">Content</label>
                <textarea class="form-control ckeditor" id="control_content" rows="3" name='content'>{{ $contentblock['content'] }}</textarea>
            </div>

            <button type="submit" class="btn btn-primary">Save</button>
        </div>
    </div>

</form>