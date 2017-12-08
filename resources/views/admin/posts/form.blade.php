<form method="post" enctype="multipart/form-data" action="{{ $action }}">
    <div class="row">
        <div class="col-12">
            <div class="form-group">
                <label for="control_name">Name</label>
                <input type="name" class="form-control" id="control_name" aria-describedby="control_name_help" placeholder="Enter post name" name='name' value="{{ $post['name'] }}">
                <!--<small id="control_name_help" class="form-text text-muted disabled">Автоматическое поле</small>-->
            </div>

            <div class="form-group">
                <label for="control_slug">Slug</label>
                <input type="text" class="form-control" id="control_slug" aria-describedby="control_slug_help" placeholder="Enter post slug" name='slug' value="{{ $post['slug'] }}">
                <!--<small id="control_name_help" class="form-text text-muted disabled">Автоматическое поле</small>-->
            </div>

            <div class="form-group">
                <input type="text" class="form-control jsTagsinput" id="control_tags" aria-describedby="control_tags_help" placeholder="Enter post tags" name='tags' value="{{ implode(',', array_map(function($tag) { return $tag['name'] ?? $tag; }, $post['tags'])) }}">
            </div>

            <div class="form-check">
                <label class="form-check-label">
                    <input type="checkbox" class="form-check-input jsBootstrapSwitch" {{ $post['active'] == 1 ? 'checked' : '' }} name="active" data-on-text="Enabled" data-off-text="Disabled" data-on-color="success">
                </label>
            </div>

            <div class="input-group form-group">
                <input type="text" class="form-control jsImageUrl" data-target="#image_url" id="control_image" aria-describedby="control_image_help" placeholder="Enter post image url" name='image' value="{{ $post['image'] }}">
                <span class="input-group-btn">
                    <button class="btn btn-outline-primary jsKcOpener" data-target="#control_image" type="button">browse</button>
                </span>
            </div>

            <div class="form-group">
                <img id="image_url" src="{{$post['image']}}" class="img-fluid {{ empty($post['image']) ? 'd-none' : '' }}" alt="Responsive image">
            </div>

            <div class="form-group">
                <label for="control_content">Content</label>
                <textarea class="form-control ckeditor" id="control_content" rows="3" name='content'>{{ $post['content'] }}</textarea>
            </div>

            <button type="submit" class="btn btn-primary">Сохранить</button>
        </div>
    </div>

</form>