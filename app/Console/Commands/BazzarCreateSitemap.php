<?php

namespace App\Console\Commands;

use App\Product;
use App\Category;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Components\BazzarParser;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use FastSimpleHTMLDom\Document;

class BazzarCreateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bazzar:create:sitemap';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creating sitemap';

    protected $_sitemapsFolder = 'storage/sitemaps';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        set_time_limit(0);

        $this->comment('Creating sitemaps...');

        $p = 1;

        $urls = [];
        $sitemaps = [];
        $toRemove = [];

        if (!file_exists(public_path().'/'.$this->_sitemapsFolder)) {
            mkdir(public_path().'/'.$this->_sitemapsFolder, 0755, true);
        }
        $iterator = new \DirectoryIterator(public_path().'/'.$this->_sitemapsFolder);
        foreach($iterator as $element)
        {
            if ($element->getExtension() === 'xml')
            {
                $toRemove[] = $element->getPathname();
            }
        }

        $bar = null;

        while (sizeof($products = Product
            ::where('broken', 0)
            ->where('active', 1)
            ->where('parsed', 1)
            ->paginate(20, ['*'], 'page', $p++)))
        {
            if (!$bar)
            {
                //$bar = $this->output->createProgressBar($products->lastPage());
                $bar = $this->output->createProgressBar($products->total());
                $bar->start();
            }
            $categoriesList = Category::with(['categories'])->where('broken', 0)->get()->toArray();
            foreach ($products as $product)
            {
                $urls[] = [
                    'loc' => route('catalogue_theproduct', [$product->createCats($categoriesList), $product->slug]),
                ];

                if (sizeof($urls) >= 1000) {
                    $sitemaps[] = $this->flushUrlsToFile($urls);
                    $urls = [];
                }
                $bar->advance();
            }
        }

        $bar->finish();
        $this->line('');

        $this->comment('Removing old sitemaps files...');

        if (sizeof($urls)) {
            $sitemaps[] = $this->flushUrlsToFile($urls);
        }

        $data ='<?xml version="1.0" encoding="UTF-8"?>'."\r\n".'<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\r\n\t".'<sitemap>'."\r\n\t\t".'<loc>'.implode('</loc></sitemap><sitemap><loc>', array_map(function($v){ return url($this->_sitemapsFolder.'/'.$v); }, $sitemaps)).'</loc>'."\r\n\t".'</sitemap>'."\r\n".'</sitemapindex>';
        file_put_contents(public_path().'/'.'sitemap.xml', $data);

        foreach ($toRemove as $file) {
            if (!file_exists($file)) {
                continue;
            }
            unlink($file);
        }

        $this->info('Done.');
    }

    protected function flushUrlsToFile (array $urls = [])
    {
        if(!sizeof($urls)) {
            return null;
        }
        $data = '<?xml version="1.0" encoding="UTF-8"?>'."\r\n".'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\r\n\t".'<url>'."\r\n\t\t".'<loc>'.implode("</loc>\r\n\t</url>\r\n\t<url>\r\n\t\t<loc>", array_map(function($v) { return $v['loc']; }, $urls)).'</loc>'."\r\n\t".'</url>'."\r\n".'</urlset>';
        $filename = 'sitemap_'.str_replace('.', '_', microtime(true)).'.xml';
        file_put_contents(public_path().'/'.$this->_sitemapsFolder.'/'.$filename, $data);
        return $filename;
    }
}
