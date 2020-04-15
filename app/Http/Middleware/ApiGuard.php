<?php

namespace App\Http\Middleware;

use Closure;

class ApiGuard
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $whitelistArray = ['172.17.136.141','172.17.136.142','157.253.152.162','
        157.253.152.163', '157.253.21.19'];
        $matches = array();
        $matchFound = preg_match_all(
                "/\b(" . implode('|',$whitelistArray) . ")\b/i", 
                $request->ip(), 
                $matches
              );

        if($matchFound || $request->ip()==="::1"){
            return $next($request);
        }
        abort(403, 'Unauthorized Access!');
    }
}
