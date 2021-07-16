#### 1.生命周期 onCreate
``` kotlin
import com.example.kotlinlearn.databinding.ActivityFullscreenBinding

class FullscreenActivity : AppCompatActivity() {

    private lateinit var binding: ActivityFullscreenBinding
    private lateinit var fullscreenContent: TextView
    private lateinit var fullscreenContentControls: LinearLayout

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityFullscreenBinding.inflate(layoutInflater)
        setContentView(binding.root)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        isFullscreen = true
        // Set up the user interaction to manually show or hide the system UI.
        fullscreenContent = binding.fullscreenContent
        fullscreenContent.setOnClickListener { toggle() }
        fullscreenContentControls = binding.fullscreenContentControls
        // Upon interacting with UI controls, delay any scheduled hide()
    }
}

```
懒加载
lateinit 初始值在后面给出,不需要加?和!!

绑定布局 
binding = ActivityFullscreenBinding.inflate(layoutInflater)
setContentView(binding.root)