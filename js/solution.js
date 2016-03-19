(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;
    var X_INDEX = 0;
    var Y_INDEX = 1;
    /**
     * Функция находит путь к выходу и возвращает найденный маршрут
     *
     * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
     * @param {number} x координата точки старта по оси X
     * @param {number} y координата точки старта по оси Y
     * @returns {[number, number][]} маршрут к выходу представленный списоком пар координат
     */
    function solution(maze, start_x, start_y) {        
                
        var maze_height = maze.length;
        var maze_width = maze[X_INDEX].length; 
        var start = [start_x, start_y];
        var posBefore = {};
        
        var end_pos = (function BFS() {
            
            posBefore[start] = start;
            var used = {};
            used[start] = true;
            var bfs_queue = [];
            var queue_begin = 0;
            bfs_queue.push(start);
        
            
            while (bfs_queue.length - queue_begin > 0) {
                var cur = bfs_queue[queue_begin];
                if (cur[Y_INDEX] === maze_height - 1) {
                    return cur;
                }                
                var x = cur[X_INDEX];
                var y = cur[Y_INDEX];
                goPos([x, y + 1], cur);
                goPos([x, y - 1], cur);
                goPos([x + 1, y], cur);
                goPos([x - 1, y], cur);               
                queue_begin++;
            }                        
                       
            function isBadPos(pos) {
                var x = pos[X_INDEX];
                var y = pos[Y_INDEX];                
                if (x < 0 || y < 0 || x === maze_width || y === maze_height || maze[y][x] === WALL) {                  
                    return true;
                }
                return false;
            }
            
            function goPos(pos, went_from) { 
                if (isBadPos(pos) || used[pos]) {                                        
                    return;
                }
                used[pos] = true;
                bfs_queue.push(pos);
                posBefore[pos] = went_from;
            }
            
        }())                    
        
        function backPathTo(pos) {            
            var path = [];
            while (pos != posBefore[pos]) {                
                path.push(pos);
                pos = posBefore[pos];
            }
            path.push(start);
            return path;
        }
        
        function forwardPathTo(pos) {
            return backPathTo(pos).reverse();
        }
                          
        return forwardPathTo(end_pos);                
    }

    root.maze.solution = solution;
})(this);
